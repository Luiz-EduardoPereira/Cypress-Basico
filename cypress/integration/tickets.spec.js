describe("Tickets", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));
    it("Preenche todos os campos do tipo texto", () => {
        const nome = 'Luiz'
        const sobrenome = 'Eduardo'

        cy.get('#first-name').type(nome)
        cy.get('#last-name').type(sobrenome)
        cy.get('#email').type('luizcypress@mozej.com')
        cy.get('#requests').type('Acento bem próximo')
        cy.get('#signature').type(`${nome} ${sobrenome}`)
    })
    it("Selecionar ticket", () => {
        cy.get('#ticket-quantity').select('2')
    })
    it("Selecionar o tipo do ticket", () => {
        cy.get('#vip').check()
    })
    it("Selecionar opções sobre o conhecimento do evento", () => {
        cy.get('#friend').check()
        cy.get('#social-media').check()
    })
    it("Selecionando duas opções sobre o conhecimento do evento e desmarcando uma", () => {
        cy.get('#friend').check()
        cy.get('#publication').check()
        cy.get('#publication').uncheck()
    })
    it("Verifica se tem o cabeçalho 'TICKETBOX'", () => {
        cy.get('h1').should('contain', 'TICKETBOX')
    })
    it.only("Verifica se o email é inválido", () => {
        cy.get('#email')
        .as('email')
            .type('email.com')
        cy.get('#email.invalid')
        .as('mensagemErroInvalido')
            .should('exist')
        cy.get('@email')
            .clear()
            .type('luizcypress@mozej.com')
        cy.get('#email.invalid').should('not.exist')
    })
})