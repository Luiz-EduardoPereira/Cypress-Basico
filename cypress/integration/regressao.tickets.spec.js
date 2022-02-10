const cliente = {
    nome:"Luiz",
    sobrenome: "Eduardo",
    nomeCompleto: "Luiz Eduardo",
    email: "luizcypress@mozej.com",
    qtdTickets: "3",
    qtdTicket: "1",
    tipoVip: "VIP",
    tipoGeneralAdmission: "General Admission"
};
describe("Teste regressão", () => {
    beforeEach(() => cy.visit("https://ticket-box.s3.eu-central-1.amazonaws.com/index.html"));
    it("Realizando compra de apenas um ingresso", () =>{
        cy.preenchendoCamposObrigatorios(cliente)
        cy.get('#ticket-quantity').select(cliente.qtdTicket)
        cy.get('#general').check()
        cy.get('#social-media').check()
        cy.get('#requests').type('Nada')
        cy.get('p').should('contain','I, '+cliente.nomeCompleto+', wish to buy '+cliente.qtdTicket+' '+cliente.tipoGeneralAdmission+' ticket.')
        cy.get('#signature').type(`${cliente.nomeCompleto}`)
        cy.get("button[type='submit']").should('not.be.disabled')
        cy.get('[type="submit"]').click()
        cy.get('.success > p').should('contain','Ticket(s) successfully ordered.')
    })
    it("Realizando compra de vários ingressos", () => {
        cy.preenchendoCamposObrigatorios(cliente)
        cy.get('#ticket-quantity').select(cliente.qtdTickets)
        cy.get('#vip').check()
        cy.get('#friend').check()
        cy.get('#social-media').check()
        cy.get('#requests').type('Nada')
        cy.get('p').should('contain','I, '+cliente.nomeCompleto+', wish to buy '+cliente.qtdTickets+' '+cliente.tipoVip+' tickets.')
        cy.get('#signature').type(`${cliente.nomeCompleto}`)
        cy.get("button[type='submit']").should('not.be.disabled')
        cy.get('[type="submit"]').click()
        cy.get('.success > p').should('contain','Ticket(s) successfully ordered.')
    })
    it("Realizando o reset dos campos e verificando se realmente estão vazios", () => {
        cy.preenchendoCamposObrigatorios(cliente)
        cy.get('#ticket-quantity').select(cliente.qtdTickets)
        cy.get('#vip').check()
        cy.get('#friend').check()
        cy.get('#social-media').check()
        cy.get('#requests').type('Nada')
        cy.get('p').should('contain','I, '+cliente.nomeCompleto+', wish to buy '+cliente.qtdTickets+' '+cliente.tipoVip+' tickets.')
        cy.get('#signature').type(`${cliente.nomeCompleto}`)
        cy.get('.reset').click()
        cy.get('#first-name').should('contain','')
        cy.get('#last-name').should('contain','')
        cy.get('#email').should('contain','')
        cy.get('#ticket-quantity').should('contain','1')
        cy.get('#friend').uncheck()
        cy.get('#social-media').uncheck()
        cy.get('#requests').should('contain','')
        cy.get('p').should('contain','I, , wish to buy 1 General Admission ticket.')
        cy.get('#agree').uncheck()
        cy.get('#signature').should('contain','')
        cy.get("button[type='submit']").should('be.disabled')
    })
    it("Preenchendo somente os campos obrigatórios", () => {
        cy.preenchendoCamposObrigatorios(cliente)
        cy.get("button[type='submit']").should('not.be.disabled')
        cy.get('.reset').click()
        cy.get('#agree').uncheck()
        cy.get("button[type='submit']").should('be.disabled')
    })
})