Cypress.Commands.add('openProductsPage', () => {
  cy.visit('/products');
});

Cypress.Commands.add('addFirstProductToCart', () => {
  cy.openProductsPage();
  cy.contains('Add to cart').first().click();
});

Cypress.Commands.add('openCartAndCheckout', () => {
  cy.get('u').contains('View Cart').click();
  cy.checkoutFromCart();
});

Cypress.Commands.add('checkoutFromCart', () => {
  cy.get('.check_out').click();
});

Cypress.Commands.add('completeOrderPayment', () => {
  cy.contains('a', 'Place Order').click();
  cy.get('[data-qa="name-on-card"]').type('PGATS Aut');
  cy.get('[data-qa="card-number"]').type('4111111111111111');
  cy.get('[data-qa="cvc"]').type('123');
  cy.get('[data-qa="expiry-month"]').type('12');
  cy.get('[data-qa="expiry-year"]').type('2030');
  cy.contains('button', 'Pay and Confirm Order').click();
});