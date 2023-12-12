describe("Login Page", () => {
    it('should display login screen', () => {
        cy.visit('/');
        cy.contains("Enhance Your Academic Experience With");
    })
})

