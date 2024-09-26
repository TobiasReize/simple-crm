describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:4200');  //ruft unsere App im Webbrowser auf
        cy.get('#user-link').click();       //holt sich die ID="user-link" und klickt darauf
        cy.url().should('include', 'user'); //es wird geprüft ob die neue URL "user" enthält
        cy.get('.add-user-btn').click();    //holt sich das Element (Button) mit der CSS-Klasse "add-user-btn" und klickt darauf
        // Der dialog-add-user öffnet sich
    })
})