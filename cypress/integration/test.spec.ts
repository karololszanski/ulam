/// <reference types="cypress"/>
export {};

describe("AppHappy", () => {
  before(() => {
    cy.visit("localhost:3000");
    cy.Ulam5Coins();
    cy.get('[data-testid="add-button"]').should("not.exist");
  });
  beforeEach(() => {
    cy.Ulam();
    cy.visit("localhost:3000");
  });

  it("Check if add button is visible when empty state", () => {
    cy.get('[data-testid="add-button"]').should("be.visible");
  });

  it("Adding coin", () => {
    cy.get('[data-testid="add-button"]').should("be.visible").click();

    cy.get('[placeholder="Select coin"]').should("be.visible").click();

    cy.contains("0cash (ZCH)").click();

    cy.get('[placeholder="Select coin"]')
      .invoke("attr", "value")
      .then((value) => {
        expect(value).to.equal("0cash (ZCH)");
      });

    cy.get('[data-testid="add-button-coin"]').should("be.visible").click();

    cy.get('[data-testid="coin-symbol"]')
      .should("be.visible")
      .should("contain", "ZCH");
  });

  it("Add button should not be visible when 5 coins", () => {
    cy.Ulam5Coins();
    cy.visit("localhost:3000");
    cy.get('[data-testid="coin-symbol"]')
      .should("be.visible")
      .should("contain", "BTC");
    cy.get('[data-testid="add-button"]').should("not.exist");
  });

  it("Remove coin", () => {
    cy.addCoin("Bitcoin", "btc");

    cy.get('[data-testid="CancelIcon"]').should("be.visible").click();

    cy.get('[data-testid="coin-symbol"]').should("not.exist");
  });
});

describe("AppSad", () => {
  before(() => {
    cy.visit("localhost:3000");
    cy.Ulam5Coins();
    cy.get('[data-testid="add-button"]').should("not.exist");
  });
  beforeEach(() => {
    cy.Ulam();
    cy.visit("localhost:3000");
  });

  it("Show warning when no coin selected", () => {
    cy.get('[data-testid="add-button"]').should("be.visible").click();

    cy.get('[data-testid="add-button-coin"]').should("be.visible").click();

    cy.contains("No coin selected").should("be.visible");
  });

  it("Error when adding the same coin", () => {
    cy.addCoin("Bitcoin", "btc");
    cy.addCoin("Bitcoin", "btc");

    cy.contains("Coin already selected").should("be.visible");
  });
});
