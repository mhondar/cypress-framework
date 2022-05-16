/// <reference types="Cypress"/>

//Importamos clases de Pages Objects
import AddressPage from '../../support/PageObjects/AddressPage'
import AuthenticationPage from '../../support/PageObjects/AuthenticationPage'
import HomePage from '../../support/PageObjects/HomePage'
import PaymentPage from '../../support/PageObjects/PaymentPage'
import ShippingPage from '../../support/PageObjects/ShippingPage'
import ShoppingCardSummaryPage from '../../support/PageObjects/ShoppingCardSummaryPage'
//La linea anterior es para que nos salga toda la libreria de cypress al colocar cy.

//Suite de pruebas que contiene cada caso
describe('Primer conjunto de casos de prueba', function () {
    const addressPage = new AddressPage()
    const authenticationPage = new AuthenticationPage()
    const homePage = new HomePage()
    const paymentPage = new PaymentPage()
    const shippingPage = new ShippingPage()
    const shoppingCardSummaryPage = new ShoppingCardSummaryPage()

    beforeEach(() => {
        //ingresamos a la pagina
        cy.visit("http://automationpractice.com/index.php")
    })
/*
    //Caso de prueba 1
    it('Contabilizar la cantidad de elementos en la seccion de pagina principal', function () {

        //Verificar la cantidad de elementos disponibles
        cy.get('#homefeatured .product-container').should('have.length', 7)

        //Obtenemos el elemento homefeatured .product-container como parámetro
        cy.get('#homefeatured .product-container').as('ProductosPopulares')

        //b¡verificamos cantidad de elementos usando alias
        cy.get('@ProductosPopulares').should('have.length', 7)
    })

    //Caso de prueba 2

    it('Agregar el elemento de tipo "blouse" al carrito de compra desde la pagina principal', function () {

        //Obtenemos el elemento homefeatured .product-container como parámetro
        cy.get('#homefeatured .product-container').as('ProductosPopulares')

        //Iteramos para encontrar un producto con nombre x
        cy.get('@ProductosPopulares')
            .find('.product-name')
            .each(($el, index, $list) => {

                if ($el.attr('title') === 'Printed Dress') {
                    cy.log('Se ha encontrado el elemento buscado')

                    cy.get('@ProductosPopulares').eq(index).find('.price').then(function ($el1) {
                        let precio = $el1.text()
                        cy.log(precio)

                        if (precio.includes('26.00')) {
                            cy.log('Se ha encontrado el precio buscado')
                            cy.get('@ProductosPopulares').eq(index).contains('Add to cart').click()
                        }
                    }) 
                }
            })
        cy.get('h2 > .ajax_cart_product_txt')
            .should('contain.text', 'There is 1 item in your cart.')
            .should('be.visible')
    })

    //Caso de Prueba 3
    it('Verificamos que el drop down de women, tenga los elementos necesarios', function () {

        //Flotamos sobre un elemento
        cy.get('#block_top_menu > ul > li:nth-child(1) > ul').invoke('attr', 'style', 'display: block;')
        cy.get('a[title="Tops"]').should('be.visible')
        cy.get('a[title="T-shirts"]').should('be.visible')
        cy.get('a[title="Blouses"]').should('be.visible')
        cy.get('a[title="Dresses"]').should('be.visible')
        cy.get('a[title^="Casual"]').should('be.visible')
        cy.get('a[title^="Evening"]').should('be.visible')
        cy.get('a[title^="Summer"]').should('be.visible')
    })



    //Caso de Prueba 4
    it('Verificar que los Checkboxes están funcionando', function () {
        cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click()
        cy.get('li[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-casual_dresses"]) input').check().should('be.checked')
        cy.get('li[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-evening_dresses"]) input').should('not.be.checked')
        cy.get('li[class="nomargin hiddable col-lg-6"]:has(a[href*="categories-summer_dresses"]) input').should('not.be.checked')
    })

   

    //Caso de Prueba 5
    it('Verificar que los dropdowns de arreglo esten funcionando', function () {
        cy.get('.sf-menu > :nth-child(2) > .sf-with-ul').click()
        cy.get('#selectProductSort').select('In stock').should('have.value','quantity:desc')
    })*/
 
    //Caso de Prueba 6
    Cypress.config('defaultCommandTimeout', 15000)
    it('Crear una compra desde cero', function () {
        homePage.getSearchBoxInput().type('Blouse')
        homePage.getSearchBoxButton().click()
        homePage.getAddToCardElementButton("Blouse").click()
        homePage.getProceedToCheckoutButton().click()
 
        shoppingCardSummaryPage.getProductNameText().should('contain.text', 'Blouse')
        shoppingCardSummaryPage.getProductPriceText().should('contain.text', '27.00')
        shoppingCardSummaryPage.getProceedToCheckoutButton().click()
 
        authenticationPage.getEmailAddressInput().type('cypress@ateneaconocimientos.net')
        authenticationPage.getPasswordInput().type('Atenea')
        authenticationPage.getSignInButton().click()
 
        addressPage.getProceedToCheckoutButton().click()
 
        shippingPage.getTermsOfServiceCheckbox().check().should('be.checked')
        shippingPage.getProceedToCheckoutButton().click()
        
        paymentPage.getPayByBankWireOptionButton().click()
        paymentPage.getIConfirmMyOrderButton().click()
        paymentPage.getDescriptionTitleText().should('contain.text', 'Your order on My Store is complete.')
        Cypress.config('defaultCommandTimeout', 4000)
    })
})