/// <reference types="cypress" />


// Import necessary page objects and test data
import LoginPage from "../../pages/LoginPage"
import LoginData from "../../fixtures/LoginData.json"
import InitialPage from "../../pages/initialPage"



//Task 1
const LoginObj = new LoginPage()

describe('Login Page', () => {

   // This event handler prevents the test from failing on uncaught exceptions
   // from the application's code, which is useful for third-party scripts.
   Cypress.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from failing the test
      return false;
   });


   beforeEach(() => {


      // Clear cookies and local storage to ensure a clean session for each test
      cy.clearAllCookies();
      cy.clearAllLocalStorage();

     // cy.login(email,password); // from command line

      LoginObj.openBaseURL() //lunch base URL
      
 

   });

   it('Validate a successful login with valid credentials.', () => {
      

      // Wait for the cookie consent banner to become visible and click it
      // Using a smart wait with .should('be.visible') is better than a hard wait

      cy.wait(800); // Waits for 2 seconds
      cy.get('#onetrust-accept-btn-handler').click({ force: true })

      const initialPageObj = new InitialPage();

      initialPageObj.clickLoginLink();  //clicking Login button from Base URL

      // Use cy.origin() to perform all subsequent actions on the new domain.
      // The email and password data are passed as arguments to the new context.

      cy.origin(
         'https://ask.permission.ai', //open 2nd url
         { args: { email: LoginData.email, password: LoginData.password } },
         ({ email, password }) => {

            Cypress.on('uncaught:exception', (err, runnable) => {
               // returning false here prevents Cypress
               // inside the cy.origin() method from failing the test
               return false
            })
              // ✅ Only wait for reCAPTCHA if it’s there
                   

            cy.get('input[type="email"]').type(email, { force: true });   // replace with correct selector
            cy.get('input[type="password"]').type(password, { force: true }); // replace with correct selector

            cy.get('button[type="submit"]').click(); // replace with correct selector

            cy.wait(2000); // Waits for 2 seconds

            // After successful login, verify that the profile dropdown is visible
            cy.get('.flex.w-full.items-center.gap-xs', { timeout: 10000 }).should('be.visible');

            // Click the profile dropdown button to reveal the user menu Logout
            cy.get('.bg-gray-100.w-full.rounded-sm.px-xxs', { timeout: 800 }).click({ multiple: true }, { force: true });
            // Find the 'Logout' menu item and click it
            cy.get('div[role="menuitem"]', { timeout: 1000 }).click({ force: true });

            cy.wait(20000);
            // Assert that the page has redirected back to the login page after logging out
            cy.get('button.bg-gray-50.px-md.py-sm', { timeout: 800 });



         })


   })

   //=================== Test login failure with incorrect credentials ======

   it('Test login failure with incorrect credentials', () => {

      // Wait for the cookie consent banner to become visible and click it
      // Using a smart wait with .should('be.visible') is better than a hard wait

      cy.wait(800); // Waits for 2 seconds
      cy.get('#onetrust-accept-btn-handler').click({ force: true })

      const initialPageObj = new InitialPage();

      initialPageObj.clickLoginLink();  //clicking Login button from Base URL

      // Use cy.origin() to perform all subsequent actions on the new domain.
      // The email and password data are passed as arguments to the new context.

      cy.origin(
         'https://ask.permission.io', //open 2nd url
         { args: { email: LoginData.Invalidemail, password: LoginData.Invalidpassword } },
         ({ email, password }) => {

            Cypress.on('uncaught:exception', (err, runnable) => {
               // returning false here prevents Cypress
               // inside the cy.origin() method from failing the test
               return false
            })            


           // cy.contains('login').invoke('removeAttr','target').click();
            cy.get('input[type="email"]').type(email, { force: true });   // replace with correct selector
            cy.get('input[type="password"]').type(password, { force: true }); // replace with correct selector

            cy.get('button[type="submit"]').click(); // replace with correct selector

            cy.wait(2000); // Waits for 2 seconds

            // Validate error popup
            cy.contains('div[data-title]', 'Invalid Credentials', { timeout: 10000 })
           .should('be.visible')


         })


   })

   //=================== Test account lockout after multiple failed login attempts ======

   it('should lock account after multiple failed login attempts', () => {

      // Wait for the cookie consent banner to become visible and click it
      // Using a smart wait with .should('be.visible') is better than a hard wait

      cy.wait(900); // Waits for 2 seconds
      cy.get('#onetrust-accept-btn-handler').click({ force: true })

      const initialPageObj = new InitialPage();

      initialPageObj.clickLoginLink();  //clicking Login button from Base URL

      // Use cy.origin() to perform all subsequent actions on the new domain.
      // The email and password data are passed as arguments to the new context.

      cy.origin(
         'https://ask.permission.ai/login', //open 2nd url
         { args: { email: LoginData.ValidEmail, password: LoginData.Invalidpassword } },
         ({ email, password }) => {

            Cypress.on('uncaught:exception', (err, runnable) => {
               // returning false here prevents Cypress
               // inside the cy.origin() method from failing the test
               return false
            })


            for (let i = 0; i < 8; i++) {   
               cy.wait(900);
            cy.get('input[type="email"]').clear().type(email, { force: true });   // replace with correct email
            cy.get('input[type="password"]').clear().type(password, { force: true }); // replace with incorrect pw

            cy.get('button[type="submit"]').click(); // replace with correct selector

            cy.wait(2000); // Waits for 2 seconds
            }
            // Validate error popup
            cy.contains('div[data-title]', 'Firebase: Error (auth/too-many-requests).', { timeout: 10000 })
           .should('be.visible')
            


         })


   })



})
