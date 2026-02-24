describe('Booking Page', () => {
  beforeEach(() => {
    cy.visit('/') 
  })

  it('affiche le formulaire correctement', () => {
    cy.get('select').should('exist')
    cy.get('input[type="date"]').should('have.length', 2)
    cy.get('button').contains('Réserver').should('exist')
  })

  it('affiche une erreur si on réserve avec des dates invalides', () => {
    cy.get('input[type="date"]').eq(0).type('2024-05-01')
    cy.get('input[type="date"]').eq(1).type('2024-04-10')
    cy.get('button').contains('Réserver').click()
    cy.get('.error', { timeout: 6000 }).should('be.visible').and('contain', 'Dates invalides')
  })

  it('permet de simuler une réservation valide', () => {
    cy.get('input[type="date"]').eq(0).type('2024-05-01')
    cy.get('input[type="date"]').eq(1).type('2024-05-10')

    cy.get('button').contains('Réserver').click()

    cy.get('.success', { timeout: 3000 }).should('be.visible').and('contain', 'Réservation confirmée')
  })

  it('applique la réduction avec le code promo SUMMER10', () => {
    // 2 nuits en chambre Standard (id: 1) = 2 * 80 = 160€
    // Avec SUMMER10 (-10%) = 160 * 0.9 = 144€
    
    // Sélection chambre standard et dates
    cy.get('select').select('1')
    cy.get('input[type="date"]').eq(0).type('2024-06-01')
    cy.get('input[type="date"]').eq(1).type('2024-06-03')
    
    // Saisie du code promo
    // Le label est "Code promo :"
    cy.get('input[type="text"]').type('SUMMER10')
    
    cy.get('button').contains('Réserver').click()

    cy.get('.success', { timeout: 3000 })
      .should('be.visible')
      .and('contain', 'Réservation confirmée ! Total :  144 €')
  })
})
