describe('Test nawigacji w galerii', function () {
    it('Powinien przejść do następnego i poprzedniego slajdu', function () {
        cy.visit('http://localhost:3000');

        cy.get('.swiper-button-next').click();
        cy.get('.swiper-slide-active').should('not.have.class', 'swiper-slide-prev');

        cy.get('.swiper-button-prev').click();
        cy.get('.swiper-slide-active').should('not.have.class', 'swiper-slide-next');
    });
});

describe('Tytuły i opisy slajdów', function () {
    it('Powinien wyświetlać poprawny tytuł i opis dla każdego slajdu', function () {
        cy.visit('http://localhost:3000');
        const expectedTitles = ['Rome', 'London', 'Paris'];
        const expectedDescriptions = ['Italy', 'United Kingdom', 'France'];

        expectedTitles.forEach((title, index) => {
            if (index > 0) {
                cy.get('.swiper-button-next').click();
                cy.wait(1000);
            }

            cy.get('.swiper-slide-active', { timeout: 10000 }).within(() => {
                cy.get('h1', { timeout: 10000 }).should('be.visible').and('contain', title);
                cy.get('p', { timeout: 10000 }).should('be.visible').and('contain', expectedDescriptions[index]);
            });
        });
    });
});
describe('Responsywność galerii', function () {
    const viewports = [
        { device: 'komputer', width: 1280, height: 800 },
        { device: 'tablet', width: 768, height: 1024 },
        { device: 'telefon', width: 375, height: 667 }
    ];

    viewports.forEach(viewport => {
        it(`Powinien wyświetlać się poprawnie na ${viewport.device}`, function () {
            cy.viewport(viewport.width, viewport.height);
            cy.visit('http://localhost:3000');
            cy.wait(2000);
            cy.get('.swiper-wrapper', { timeout: 15000 }).should('be.visible');
            cy.get('.swiper-slide').should('have.length.greaterThan', 0);
            cy.get('.swiper-button-next').should('be.visible').and('not.be.disabled');
            cy.get('.swiper-button-prev').should('be.visible').and('not.be.disabled');
        });
    });
});
describe('Walidacja wyświetlania galerii', function () {
    it('Powinien poprawnie wyświetlać wszystkie elementy galerii', function () {
        cy.visit('http://localhost:3000');
        cy.get('.swiper-wrapper').should('be.visible');
        cy.get('.swiper-slide').should('have.length.at.least', 3);
        cy.get('.swiper-button-next').should('be.visible').and('not.be.disabled');
        cy.get('.swiper-button-prev').should('be.visible').and('not.be.disabled');
    });
});