// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


// Login function

Cypress.Commands.add("login", (email, password) => {
  
    // Type the username and password into the respective fields
    //cy.visit('https://www.permission.io/')
   // cy.wait(800); // Waits for 2 seconds
   //  cy.get('#onetrust-accept-btn-handler').click({ force: true })
  //  cy.get('').click();
 // cy.get('.nav_main_btn-group > [data-wf--button-main--style="primary"] > .clickable_wrap > .clickable_link').click()
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);

  // Click the login button
  cy.get('button[type="submit"]').click();
  cy.wait(2000); // Waits for 2 seconds

});


// Logout function

Cypress.Commands.add('logout', () => {
 
            // Click the profile dropdown button to reveal the user menu Logout
            cy.get('.bg-gray-100.w-full.rounded-sm.px-xxs', { timeout: 800 }).click({ multiple: true }, { force: true });
            // Find the 'Logout' menu item and click it
            cy.get('div[role="menuitem"]', { timeout: 1000 }).click({ force: true });

            cy.wait(20000);
            // Assert that the page has redirected back to the login page after logging out
            cy.get('button.bg-gray-50.px-md.py-sm', { timeout: 800 });


});