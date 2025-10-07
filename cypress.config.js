const { defineConfig } = require("cypress");


module.exports = defineConfig({

  waitForAnimations: false,
  animationDistanceThreshold: 50,
 
  reporter: 'cypress-mochawesome-reporter',
   // Global configuration options for all tests
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  execTimeout: 60000,
  pageLoadTimeout: 60000,
  requestTimeout: 15000,
  responseTimeout: 15000,
  video: true,

  // Mochawesome Reporter Configuration
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    reportFilename: "report",
    overwrite: false,
    html: true,
    json: true,
    charts: true
  },

  
  e2e: {
    
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
     // experimentalOrigin: true;   // allow multiple domains
    //  experimentalSessionAndOrigin: true;
      
      // implement node event listeners here
    },
  
    // defaultCommandTimeout: 10000, // Increase to 10 seconds
     experimentalStudio: true
  },
   
  env:{

    BaseURL:'https://www.permission.ai/',
    URL:'https://ask.permission.ai',
    userPassword: "MySecurePassword123!",
     }

    

});

