describe('test to-do app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')

        cy.get('#input-task').as('inputTask');
        cy.get('#submit-task').as('submit');
        cy.get('#active-task-count').as('counter');
        cy.get('#taskList').as('tasks');

        cy.get('@inputTask').type('Task1');
        cy.get('@submit').click();

        cy.get('@inputTask').type('Task2');
        cy.get('@submit').click();

    })

    it('should add todo item', () => {
        cy.get('@tasks').children().should('have.length', 4);
        cy.get('@counter').should('have.text', 2);
    })

    it('should todo item completed and test tabs', () => {
        cy.get('label').first().click();
        cy.get('@counter').should('have.text', 1);

        cy.get('#Active').click();
        cy.get('@tasks').children().should('have.length', 2);

        cy.get('@inputTask').type('Task3');
        cy.get('@submit').click();
        cy.get('@tasks').children().should('have.length', 4);

        cy.get('#Completed').click();
        cy.get('@tasks').children().should('have.length', 2);

        cy.get('#All').click();
        cy.get('@tasks').children().should('have.length', 6);
    });

    it('should delete completed item', () => {
        cy.get('@inputTask').type('Task3');
        cy.get('@submit').click();

        cy.get('label').first().click();

        cy.get('#task-cancel-btn').click();
        cy.get('@tasks').children().should('have.length', 4);
        cy.get('@counter').should('have.text', 2);
    });
})
