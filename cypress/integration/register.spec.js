/// <reference types="cypress" />

import "@testing-library/cypress/add-commands";

context("Register tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/register");
  });

  it("should fail form validation due to missing username", () => {
    cy.get('input[name="password"]').type("testcase1");
    cy.get('input[name="email"]').type("testcase1@gmail.com");
    cy.get("button").contains("Register").click();
    cy.findByText("Username is a required field").should("exist");
  });

  it("should register a user", () => {
    cy.get('input[name="username"]').type("testcase2");
    cy.get('input[name="password"]').type("testcase2");
    cy.get('input[name="email"]').type("testcase2@gmail.com");
    cy.get("button").contains("Register").click();
    cy.findByText("You have been registered!").should("exist");
  });

  it("should display message stating username already exists", () => {
    cy.get('input[name="username"]').type("testcase2");
    cy.get('input[name="password"]').type("testcase2");
    cy.get('input[name="email"]').type("testcase2@gmail.com");
    // cy.wait(5000); // ensures previous commited user is now in DB
    cy.get("button").contains("Register").click();
    cy.findByText("Username already exists").should("exist");
  });
});

context("Login tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should login with registered user", () => {
    cy.get('input[name="username"]').type("testcase2");
    cy.get('input[name="password"]').type("testcase2");
    cy.get("button").contains("Login").click();
    cy.findByText("Company List").should("exist");
  });
});
