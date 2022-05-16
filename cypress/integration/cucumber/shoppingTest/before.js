before(() => {
    //Cargamos los valores del archivo example.json en un objeto   json
    cy.fixture('example').then(function (datos) {
        this.datos = datos
    })
})