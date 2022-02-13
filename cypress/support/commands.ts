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

Cypress.Commands.add("Ulam", () => {
  cy.session("Ulam", () => {
    //session name is the name of the saved and retrieved session
    cy.visit("http://localhost:3000/"); //visit the page
    cy.contains("Ulam Labs recruitment task").should("be.visible"); //basic assert that the page loaded correctly
  });
});

Cypress.Commands.add("Ulam5Coins", () => {
  cy.session("Ulam5Coins", () => {
    //session name is the name of the saved and retrieved session
    cy.visit("http://localhost:3000/"); //visit the page
    cy.contains("Ulam Labs recruitment task").should("be.visible"); //basic assert that the page loaded correctly

    cy.addCoin("Bitcoin", "btc");
    cy.addCoin("Binance-Peg Cardano", "ada");
    cy.addCoin("Buff Doge Coin", "DOGECOIN");
    cy.addCoin("Fantom", "FTM");
    cy.addCoin("COTI", "COTI");
  });
});

Cypress.Commands.add("addCoin", (coinName: string, coinSymbol: string) => {
  cy.get('[data-testid="add-button"]').should("be.visible").click();

  cy.get('[placeholder="Select coin"]').should("be.visible").click();

  cy.contains(`${coinName} (${coinSymbol.toUpperCase()})`).click();

  cy.get('[placeholder="Select coin"]')
    .invoke("attr", "value")
    .then((value) => {
      expect(value).to.equal(`${coinName} (${coinSymbol.toUpperCase()})`);
    });

  cy.get('[data-testid="add-button-coin"]').should("be.visible").click();

  cy.get('[data-testid="coin-symbol"]')
    .should("be.visible")
    .should("contain", coinSymbol.toUpperCase());
});

export {};
