/// <reference types="Cypress"/>

//Suite de Casos de Pruebas Avanzadas
describe('Tercer feature de casos avanzados', function(){
    beforeEach(() => {
        //Cargamos los valores del archivo example.json en un objeto de datos
        cy.fixture('carritoDeCompras').then(function (datos) {
            this.datos = datos
        })
        //ingresar a la pagina de compra de articulos tecnologicos
        cy.visit("https://demo.opencart.com/index.php")
    })

    //Caso de prueba 8
    it('Realizar compra de celulares basadas en su titulo', function(){
        
        cy.get('#menu ul a:contains("Phones & PDAs")').click()

        this.datos.articulo.forEach(function(articulo){
            cy.agregarElementoAlCarrito(articulo)
            // cy.pause()
        })

        cy.get('.btn-inverse').click()

        this.datos.articulo.forEach(function(articulo){
            cy.verificamosElementoCarritoDropDown(articulo)
        })
 
    })
    //Caso de Pruebas 9
    it('Verificacion de suma de monto total drop down de carrito de compras', function () {
        cy.get("#menu ul a:contains('Phones & PDAs')").click()
 
        this.datos.articulo.forEach(function (articulo) {
            cy.agregarElementoAlCarrito(articulo)
        })
 
        cy.get('.btn-inverse').click()
 
        this.datos.articulo.forEach(function (articulo) {
            cy.verificamosElementoCarritoDropDown(articulo)
        })
 
        var suma = 0
 
        cy.get("tr:has(button) td:contains('$')").each(($el) => {
            const monto = $el.text()
            var precio = monto.replace('$', '')
            suma = Number(suma) + Number(precio)
            cy.log("La suma es: " + suma)
        })
 
        cy.get(".table.table-bordered :nth-child(4) :contains('$')").then(function ($el) {
            const monto = $el.text()
            var total = monto.replace('$', '')
            expect(Number(total)).to.equal(Number(suma)+1)
        })
 
    })

}) 