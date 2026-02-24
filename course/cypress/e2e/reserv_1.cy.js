
describe('reservation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/reservation')
  })

    it('should display the reservation form', () => {

        cy.get('label').contains('Chambre :').should('be.visible')
        cy.get('label').contains('Date début :').should('be.visible')
        cy.get('label').contains('Date fin :').should('be.visible')
        cy.get('label').contains('Code promo :').should('be.visible')
        cy.get('input[type="date"]').should('be.visible')
        cy.get('input[type="text"]').should('be.visible')
        cy.get('button').contains('Réserver').should('be.visible')
    })

    it('should allowe the user to change the select value', () => {
        cy.get('select').select('Standard  -  80 €/nuit')
        cy.get('select').should('have.value', '1')

        cy.get('select').select('Deluxe  -  120 €/nuit')
        cy.get('select').should('have.value', '2')
    })

    it("should allow change date input value", () => {
        const startDate = '2024-07-01'
        const endDate = '2024-07-10'
        cy.get('input[type="date"]').eq(0).type(startDate)
        cy.get('input[type="date"]').eq(0).should('have.value', startDate)
        cy.get('input[type="date"]').eq(1).type(endDate)
        cy.get('input[type="date"]').eq(1).should('have.value', endDate)
    })

    it("should allow change text input value", () => {
        const promoCode = 'PROMO2024'
        cy.get('input[type="text"]').type(promoCode)
        cy.get('input[type="text"]').should('have.value', promoCode)
    })

    it('should submit the form with valid data', () => {
        const startDate = '2024-07-01'
        const endDate = '2024-07-10'
        const roomId = 1
        cy.intercept('GET', `/booking/room/${roomId}/availability?startDate=${startDate}&endDate=${endDate}`, {
            statusCode: 200,
            body: {
                available: true
            }
        }).as('checkAvailability')
        cy.intercept('POST', '/booking', {
            statusCode: 200,
            body: {
                status: 'ok',
            }
        }).as('createBooking')

        cy.get('select').select('Standard  -  80 €/nuit')
        cy.get('input[type="date"]').eq(0).type(startDate)
        cy.get('input[type="date"]').eq(1).type(endDate)
        cy.get('button').contains('Réserver').click()
        cy.wait('@checkAvailability')
        cy.wait('@createBooking')
        cy.get("p.success").should("be.visible").and("contain", "Réservation confirmée ! Total :  684 €")
    })

    it("should take only valid promo code", () => {
        const startDate = '2024-07-01'
        const endDate = '2024-07-10'
        const promoCode = 'PROMO2024'
        const roomId = 1
        cy.intercept('GET', `/booking/room/${roomId}/availability?startDate=${startDate}&endDate=${endDate}`, {
            statusCode: 200,
            body: {
                available: true
            }
        }).as('checkAvailability')
        cy.intercept('POST', '/booking', {
            statusCode: 200,
            body: {
                status: 'ok',
            }
        }).as('createBooking')

        cy.get('select').select('Standard  -  80 €/nuit')
        cy.get('input[type="date"]').eq(0).type(startDate)
        cy.get('input[type="date"]').eq(1).type(endDate)
        cy.get('input[type="text"]').type(promoCode)
        cy.get('button').contains('Réserver').click()
        cy.wait('@checkAvailability')
        cy.wait('@createBooking')
        cy.get("p.success").should("be.visible").and("contain", "Réservation confirmée ! Total :  684 €")
    })

    it("should work with valid promo code", () => {
        const startDate = '2024-07-01'
        const endDate = '2024-07-10'
        const promoCode = 'SUMMER10'
        const roomId = 1
        cy.intercept('GET', `/booking/room/${roomId}/availability?startDate=${startDate}&endDate=${endDate}`, {
            statusCode: 200,
            body: {
                available: true
            }
        }).as('checkAvailability')
        cy.intercept('POST', '/booking', {
            statusCode: 200,
            body: {
                status: "ok",
            }
        }).as('createBooking')

        cy.get('select').select('Standard  -  80 €/nuit')
        cy.get('input[type="date"]').eq(0).type(startDate)
        cy.get('input[type="date"]').eq(1).type(endDate)
        cy.get('input[type="text"]').type(promoCode)
        cy.get('button').contains('Réserver').click()
        cy.wait('@checkAvailability')
        cy.wait('@createBooking')
        cy.get("p.success").should("be.visible").and("contain", "Réservation confirmée ! Total :  616 €")
    })

    it("should show an error message for invalid Date", () => {
        const startDate = '2024-07-10'
        const endDate = '2024-07-01'
        const roomId = 1
        cy.get('select').select('Standard  -  80 €/nuit')
        cy.get('input[type="date"]').eq(0).type(startDate)
        cy.get('input[type="date"]').eq(1).type(endDate)
        cy.get('button').contains('Réserver').click()
        cy.get("p.error").should("be.visible").and("contain", "Dates invalides")
    })

    it("should show an error message for same Date", () => {
        const startDate = '2024-07-01'
        const endDate = '2024-07-01'
        const roomId = 1
        cy.get('select').select('Standard  -  80 €/nuit')
        cy.get('input[type="date"]').eq(0).type(startDate)
        cy.get('input[type="date"]').eq(1).type(endDate)
        cy.get('button').contains('Réserver').click()
        cy.get("p.error").should("be.visible").and("contain", "Dates invalides")
    })

    it("should show an error message for unavailable room", () => {
        const startDate = '2024-07-01'
        const endDate = '2024-07-10'
        const roomId = 1
        cy.intercept('GET', `/booking/room/${roomId}/availability?startDate=${startDate}&endDate=${endDate}`, {
            statusCode: 200,
            body: {
                available: false
            }
        }).as('checkAvailability')
        cy.get('select').select('Standard  -  80 €/nuit')
        cy.get('input[type="date"]').eq(0).type(startDate)
        cy.get('input[type="date"]').eq(1).type(endDate)
        cy.get('button').contains('Réserver').click()
        cy.wait('@checkAvailability')
        cy.get("p.error").should("be.visible").and("contain", "Chambre indisponible")
    })

    it("should show an error message for error during booking", () => {
        const startDate = '2024-07-01'
        const endDate = '2024-07-10'
        const roomId = 1
        cy.intercept('GET', `/booking/room/${roomId}/availability?startDate=${startDate}&endDate=${endDate}`, {
            statusCode: 200,
            body: {
                available: true
            }
        }).as('checkAvailability')
        cy.intercept('POST', '/booking', {
            statusCode: 500,
            body: {
                status: "error",
            }
        }).as('createBooking')

        cy.get('select').select('Standard  -  80 €/nuit')
        cy.get('input[type="date"]').eq(0).type(startDate)
        cy.get('input[type="date"]').eq(1).type(endDate)
        cy.get('button').contains('Réserver').click()
        cy.wait('@checkAvailability')
        cy.wait('@createBooking')
        cy.get("p.error").should("be.visible").and("contain", "Erreur lors de la réservation")
    })
})