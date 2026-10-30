/// <reference types="cypress" />

describe('Automation Exercise - Casos de teste', () => {
  const uniqueEmail = (prefix = 'pgats') => `${prefix}-${Date.now()}@mail.com`;
  const validUser = {
    name: 'PGATS Usuario Valido',
    email: uniqueEmail('usuario-valido'),
    password: '12345',
  };

  before(() => {
    cy.registerUser(validUser.name, validUser.email);
    cy.contains('Account Created!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    cy.get('a[href="/logout"]').click();
  });

  it('Caso 1 - Registrar usuário com sucesso', () => {
    const email = uniqueEmail('caso1');

    cy.registerUser('PGATS Caso 1', email);

    cy.contains('Account Created!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    cy.contains('Logged in as').should('be.visible');
    cy.get('a[href="/logout"]').click();
  });

  it('Caso 2 - Login com usuário válido', () => {
    cy.loginWithCredentials(validUser.email, validUser.password);

    cy.contains('Logged in as').should('be.visible');
    cy.get('a[href="/logout"]').should('be.visible');
  });

  it('Caso 3 - Login com credenciais inválidas', () => {
    cy.openLoginPage();
    cy.get('[data-qa="login-email"]').type('usuario-invalido@mail.com');
    cy.get('[data-qa="login-password"]').type('senhaerrada');
    cy.get('[data-qa="login-button"]').click();

    cy.contains('Your email or password is incorrect!').should('be.visible');
  });

  it('Caso 4 - Logout do usuário', () => {
    cy.loginWithCredentials(validUser.email, validUser.password);
    cy.get('a[href="/logout"]').click();

    cy.url().should('include', '/login');
  });

  it('Caso 5 - Registrar usuário com e-mail já existente', () => {
    cy.openLoginPage();
    cy.get('[data-qa="signup-name"]').type('PGATS Existente');
    cy.get('[data-qa="signup-email"]').type(validUser.email);
    cy.get('[data-qa="signup-button"]').click();

    cy.contains('Email Address already exist!').should('be.visible');
  });

  it('Caso 8 - Verificar todos os produtos e página de detalhes', () => {
    cy.visit('/');
    cy.get('a[href="/products"]').click();

    cy.contains('All Products').should('be.visible');
    cy.get('.product-image-wrapper').should('have.length.greaterThan', 0);

    cy.contains('View Product').first().click();
    cy.url().should('include', '/product_details/');
    cy.get('.product-information').should('be.visible').and('contain.text', 'Category');
  });

  it('Caso 9 - Pesquisar produto', () => {
    cy.visit('/');
    cy.get('a[href="/products"]').click();
    cy.get('#search_product').type('Blue Top');
    cy.get('#submit_search').click();

    cy.contains('Searched Products').should('be.visible');
    cy.get('.product-image-wrapper').should('contain.text', 'Blue Top');
  });

  it('Caso 10 - Enviar formulário de contato', () => {
    cy.visit('/');
    cy.get('a[href="/contact_us"]').click();
    cy.get('[data-qa="name"]').type('PGATS Aut');
    cy.get('[data-qa="email"]').type('pgats-contato@mail.com');
    cy.get('[data-qa="subject"]').type('Teste de contato');
    cy.get('[data-qa="message"]').type('Mensagem de teste automática');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json');

    cy.on('window:confirm', () => true);
    cy.get('[data-qa="submit-button"]').click();

    cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
  });

  it('Caso 15 - Realizar pedido cadastrando usuário durante o checkout', () => {
    cy.addFirstProductToCart();
    cy.openCartAndCheckout();
    cy.contains('Register / Login').click();

    const email = uniqueEmail('pedido-cadastro');
    cy.registerUser('Pedido Cadastro', email);
    cy.get('[data-qa="continue-button"]').click();

    cy.visit('/view_cart');
    cy.checkoutFromCart();
    cy.completeOrderPayment();

    cy.contains('Order Placed!').should('be.visible');
    cy.get('a[href="/logout"]').click();
  });

  it('Caso 16 - Realizar pedido logado antes do checkout', () => {
    cy.loginWithCredentials(validUser.email, validUser.password);
    cy.addFirstProductToCart();
    cy.openCartAndCheckout();
    cy.completeOrderPayment();

    cy.contains('Order Placed!').should('be.visible');
    cy.get('a[href="/logout"]').click();
  });
});
