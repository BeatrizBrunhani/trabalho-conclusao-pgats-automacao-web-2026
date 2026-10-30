Cypress.Commands.add('openLoginPage', () => {
  cy.visit('/');

  cy.get('body').then(($body) => {
    if ($body.find('a[href="/logout"]').length) {
      cy.get('a[href="/logout"]').click();
    }
  });

  cy.get('a[href="/login"]').click();
});

Cypress.Commands.add('loginWithCredentials', (email, password) => {
  cy.openLoginPage();
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(password);
  cy.get('[data-qa="login-button"]').click();
});

Cypress.Commands.add('registerUser', (name, email) => {
  cy.openLoginPage();
  cy.get('[data-qa="signup-name"]').type(name);
  cy.get('[data-qa="signup-email"]').type(email);
  cy.get('[data-qa="signup-button"]').click();

  cy.get('#id_gender2').check();
  cy.get('[data-qa="password"]').type('12345');
  cy.get('[data-qa="days"]').select('1');
  cy.get('[data-qa="months"]').select('September');
  cy.get('[data-qa="years"]').select('1990');
  cy.get('#newsletter').check();
  cy.get('#optin').check();
  cy.get('[data-qa="first_name"]').type('PGATS');
  cy.get('[data-qa="last_name"]').type('Aut');
  cy.get('[data-qa="company"]').type('PGATS');
  cy.get('[data-qa="address"]').type('Example Address');
  cy.get('[data-qa="country"]').select('United States');
  cy.get('[data-qa="state"]').type('California');
  cy.get('[data-qa="city"]').type('Los Angeles');
  cy.get('[data-qa="zipcode"]').type('12345');
  cy.get('[data-qa="mobile_number"]').type('+1 123 456 7890');
  cy.get('[data-qa="create-account"]').click();
});