/// <reference types="cypress" />

// Import necessary page objects and test data
import LoginPage from "../../pages/LoginPage"
import LoginData from "../../fixtures/LoginData.json"
import InitialPage from "../../pages/initialPage"



// Define selectors directly in the test file
const selectors = {
   chatbox: '.mx-auto',
  searchicon: 'img[alt="search"]',
  notificationicon: '.lucide.lucide-bell',
  wallet : 'a[class="flex items-center rounded-full bg-gray-100 px-md py-xs"]',
  logo : 'img[class="aspect-square h-full w-full"]',
  profile : '.bg-gray-100.w-full.rounded-sm.px-xxs',
  title : '.font-semibold',
  subtitle : '.text-sm.text-gray-600',
  welcome : 'div[class="text-md leading-relaxed"] p',
  time : 'body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > span:nth-child(1)',
  walleticon : 'a[class="flex items-center rounded-full bg-gray-100 px-md py-xs"]',
  msg : 'body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)',
  msginputbox : 'input[placeholder="Type your message..."]',
  sendbtt : 'body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)',
  footer : 'div[class="fixed bottom-0 w-full flex-wrap items-center gap-1 break-all border-t border-gray-200 bg-background p-4 text-center text-white sm:flex"]',
  menuicon : 'img[alt="menu"]' ,
  reply : 'strong:nth-child(1)',
  sendtext : 'body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(1)',
  textveri : 'body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p:nth-child(1)'
};


const LoginObj = new LoginPage()
//Task 2 a

describe('Basic Chat Functionality:', () => {

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
      LoginObj.openBaseURL() //lunch base URL
    //  login(LoginData.email,LoginData.password)

  })

  
  it("Task # 1 : Should load AI page and verify chat UI elements", () => {
    // ✅ Verify side menu is visible
    
      cy.wait(800); // Waits for 2 seconds
      cy.get('#onetrust-accept-btn-handler').click({ force: true }) //cookie
      cy.get('.nav_main_btn-group > [data-wf--button-main--style="primary"] > .clickable_wrap > .clickable_link').click();

    //  cy.get('button[class="inline-flex items-center justify-around whitespace-nowrap rounded-md disabled:pointer-events-none w-fit dark:text-white bg-gray-50 hover:bg-gray-100 dark:bg-primary-900 dark:hover:bg-gray-900 hover:shadow-sm disabled:bg-gray-100 disabled:text-gray-300 h-12 px-md py-sm text-md-semibold gap-xs rounded-md w-full"]').click()
  
    cy.login(LoginData.email,LoginData.password)


    cy.wait(20000); // Waits for 2 seconds
//    cy.get('.flex.w-full.items-center.gap-xs', { timeout: 10000 }).should('be.visible');
   cy.get(selectors.chatbox,{ timeout: 800 }).should('be.visible');

   cy.wait(2000);
   cy.get(selectors.searchicon, { timeout: 800 }).should('be.visible'); //search icon
 //cy.get('.display-xs-semibold.capitalize').should('be.visible'); //AI displayed

 
 cy.get(selectors.notificationicon, { timeout: 800 }).should('be.visible'); //Notification icon displayed

 
 cy.get(selectors.wallet, { timeout: 800 }).should('be.visible'); // Walletr icon displayed

 
 cy.get(selectors.logo, { timeout: 2000 }).should('be.visible'); // icon
cy.get(selectors.profile, { timeout: 2000 }).should('be.visible') //profile button
cy.get(selectors.title, { timeout: 2000 }).should('be.visible'); // title displayed
cy.get(selectors.subtitle, { timeout: 2000 }).should('be.visible'); //sub title displayed
//cy.get(selectors.welcome, { timeout: 2000 }).should('be.visible'); // Wellcome message displayed
//cy.get(selectors.time, { timeout: 2000 }).should('be.visible'); // timing displayed
 cy.get(selectors.walleticon, { timeout: 1000 }).should('be.visible'); // Walletr icon displayed
cy.get(selectors.msg,{ timeout: 2000 }).should('be.visible') // message displayed
cy.get(selectors.msginputbox, { timeout: 2000 }).should('be.visible'); // message input box displayed
 cy.get(selectors.sendbtt, { timeout: 2000 }).should('be.visible').and('be.disabled'); // msg sending button displayed
 
 cy.get(selectors.footer, { timeout: 2000 }).should('be.visible'); // footer displayed
 cy.get(selectors.menuicon, { timeout: 2000 }).should('be.visible'); // Menu icon displayed

 
cy.wait(1000); // Waits for 2 seconds
   
   cy.logout();

})



  it('Task # 2: Input field and send button are functional', () => {
    // ✅ Verify side menu is visible
    
      cy.wait(800); // Waits for 2 seconds
      cy.get('#onetrust-accept-btn-handler').click({ force: true })
      cy.get('button[class="inline-flex items-center justify-around whitespace-nowrap rounded-md disabled:pointer-events-none w-fit dark:text-white bg-gray-50 hover:bg-gray-100 dark:bg-primary-900 dark:hover:bg-gray-900 hover:shadow-sm disabled:bg-gray-100 disabled:text-gray-300 h-12 px-md py-sm text-md-semibold gap-xs rounded-md w-full"]').click()
  
    cy.login(LoginData.email,LoginData.password)

    cy.wait(30000); // Waits for 2 seconds
 cy.get(selectors.msginputbox, { timeout: 1000 }).type("How your data is protected?"); // message input box displayed
 cy.get(selectors.sendbtt,  { timeout: 1000 }).click() // msg sending button displayed
 cy.wait(10000); 
 cy.get(selectors.sendtext).should('have.text', 'How your data is protected?')
 cy.wait(10000);  
 cy.get(selectors.reply).should('be.visible').and('not.be.empty'); 

cy.wait(10000); // Waits for 2 seconds
   
  cy.logout();

})



  it('Task 3 : Placeholder text and UI elements render properly', () => {
    // ✅ Verify side menu is visible
    
      cy.wait(800); // Waits for 2 seconds
      cy.get('#onetrust-accept-btn-handler').click({ force: true })
      cy.get('button[class="inline-flex items-center justify-around whitespace-nowrap rounded-md disabled:pointer-events-none w-fit dark:text-white bg-gray-50 hover:bg-gray-100 dark:bg-primary-900 dark:hover:bg-gray-900 hover:shadow-sm disabled:bg-gray-100 disabled:text-gray-300 h-12 px-md py-sm text-md-semibold gap-xs rounded-md w-full"]').click()
  
    cy.login(LoginData.email,LoginData.password)

    cy.wait(30000); // Waits for 2 seconds

    
      
 cy.get(selectors.sendbtt,{ timeout: 2000 }).should('be.visible').should('be.disabled') //check send button before typing message
 
cy.get(selectors.msginputbox, { timeout: 1000 }).should('be.visible') //inout box check place holder
      .and('have.attr', 'placeholder', 'Type your message...').type("Enter");
   

      
 cy.get(selectors.sendbtt,{ timeout: 2000 }).should('be.visible').should('be.enabled') // check button after typing test in inout box
 
cy.wait(10000); // Waits for 2 seconds
   
  cy.logout();

})


})