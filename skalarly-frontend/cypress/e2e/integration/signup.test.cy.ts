describe('Signup Page', () => {
  beforeEach(() => {
    cy.visit('/sign-up');
  });

  it('should display instititution options', () => {
    cy.fixture('insititutions.json').as('institutionsJSON');
    cy.intercept('GET','http://universities.hipolabs.com/search', '@institutionsJSON').as(
      'institutions',
    );
    cy.wait('@institutions');
    cy.get('mat-step app-reusable-dropdown').its('length').should('be.gt', 1);
    cy.get('app-reusable-dropdown');
  });

  it('should display skalar info', () => {
    cy.get('ng-template matStepLabel').last().click();
    cy.get('mat-step form').its('length').should('be', 1);

  });
});
