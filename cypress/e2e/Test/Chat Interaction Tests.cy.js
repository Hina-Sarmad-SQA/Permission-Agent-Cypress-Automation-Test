/// <reference types="cypress" />

// Import necessary page objects and test data
import LoginPage from "../../pages/LoginPage"
import LoginData from "../../fixtures/LoginData.json"
import InitialPage from "../../pages/initialPage"

const LoginObj = new LoginPage()

//Task 2 b
describe('Message Handling:', () => {

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
      LoginObj.openURL() //lunch base URL
    //  login(LoginData.email,LoginData.password)

  })

  
  it("Task # 1 : Send simple text messages and validate responses", () => {
    // ✅ Verify side menu is visible
    
      cy.wait(800); // Waits for 2 seconds
      cy.get('#onetrust-accept-btn-handler').click({ force: true })
      cy.get('button[class="inline-flex items-center justify-around whitespace-nowrap rounded-md disabled:pointer-events-none w-fit dark:text-white bg-gray-50 hover:bg-gray-100 dark:bg-primary-900 dark:hover:bg-gray-900 hover:shadow-sm disabled:bg-gray-100 disabled:text-gray-300 h-12 px-md py-sm text-md-semibold gap-xs rounded-md w-full"]').click()
  
    cy.login(LoginData.email,LoginData.password)

    cy.wait(20000); // Waits for 2 seconds

 cy.get('input[placeholder="Type your message..."]', { timeout: 3000 }).type("let me know about fiverr"); // message input box displayed
 cy.get('body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)').click() // msg sending button displayed
 cy.wait(10000); 
 cy.get('body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p:nth-child(1)').should('have.text', 'let me know about fiverr')
 cy.wait(10000);  
 cy.get('body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > p:nth-child(1)').should('be.visible')
 cy.wait(10000);  

cy.wait(1000); // Waits for 2 seconds
   
   cy.logout();

})


 it("Task # 2 : Verify message history persistence during session", () => {
    // ✅ Verify side menu is visible
    
      cy.wait(800); // Waits for 2 seconds
      cy.get('#onetrust-accept-btn-handler').click({ force: true })
      cy.get('button[class="inline-flex items-center justify-around whitespace-nowrap rounded-md disabled:pointer-events-none w-fit dark:text-white bg-gray-50 hover:bg-gray-100 dark:bg-primary-900 dark:hover:bg-gray-900 hover:shadow-sm disabled:bg-gray-100 disabled:text-gray-300 h-12 px-md py-sm text-md-semibold gap-xs rounded-md w-full"]').click()
  
    cy.login(LoginData.email,LoginData.password)

    cy.wait(20000); // Waits for 2 seconds

    // Define the messages to send
    const messages = [
      "let me know about fiverr",
      "What is permission.io?",
     // "How can I earn rewards?"
      "How your data is protected?"
    ];
    // Loop through each message, send it, and validate the history
    messages.forEach((userMessage, index) => {
      // Find the input field and type the message
      cy.get('input[placeholder="Type your message..."]', { timeout: 10000 }).type(userMessage);
      
      // Find the send button and click it

 cy.get('body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)').click() // msg sending button displayed
 cy.wait(20000); 
 // Assert that the user's message is visible in the chat history
      // We are using the 'flex justify-end' selector from your HTML for user messages.
      cy.get('.flex.justify-end p').eq(index)
        .should('be.visible')
        .and('have.text', userMessage);

        
      // Assert that the user's message is visible in the chat history
      // We are using the 'flex justify-end' selector from your HTML for user messages.
      cy.get('.flex.justify-end p').eq(index)
        .scrollIntoView() // Scroll the element into view first
        .should('be.visible')
        .and('have.text', userMessage);

      // Assert that the AI's response is visible
      // We are using the 'flex justify-start' selector from your HTML for AI messages.
      cy.get('.flex.justify-start p').eq(index)
        .scrollIntoView() // Scroll the element into view first
        .should('be.visible')
        .and('not.be.empty'); // Check that the response is not empty
    });

 cy.wait(10000); // Waits for 2 seconds
   
   cy.logout();

})

it("Task # 3 : Validate timestamps on messages", () => {
    // ✅ Verify side menu is visible
    
      cy.wait(800); // Waits for 2 seconds
      cy.get('#onetrust-accept-btn-handler').click({ force: true })
      cy.get('button[class="inline-flex items-center justify-around whitespace-nowrap rounded-md disabled:pointer-events-none w-fit dark:text-white bg-gray-50 hover:bg-gray-100 dark:bg-primary-900 dark:hover:bg-gray-900 hover:shadow-sm disabled:bg-gray-100 disabled:text-gray-300 h-12 px-md py-sm text-md-semibold gap-xs rounded-md w-full"]').click()
  
    cy.login(LoginData.email,LoginData.password)

    cy.wait(20000); // Waits for 2 seconds
// Send a message that is known to trigger an AI response with buttons
    const triggerMessage = "I am new here, tell me more about Permission.";
    cy.get('input[placeholder="Type your message..."]').type(triggerMessage);
    cy.get('button:has(svg.lucide-send)').click();
    
     cy.wait(10000); 
    // Wait for the AI's response to appear
    cy.get('.flex.justify-start').should('have.length', 1);

    // Validate the AI's response and timestamp
    cy.get('.flex.justify-start .text-xs').eq(0)
      .should('be.visible')
      .invoke('text')
      .should('match', /^(0?\d|1[0-2]):[0-5]\d\s(AM|PM)$/);

     cy.wait(10000); // Waits for 2 seconds
   
   cy.logout();

})




})