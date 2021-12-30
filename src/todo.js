/*
    Agregar la asocicación de categorías a en el endpoin the findOne y
    rever la sintaxis de las rutas que implementan el query validator

    The architecture in this project is clean architecture, this means that the project has different
    layers, where the outter layer knows the iner layer. In this app, the outtest layer will be the
    routes with the validations and middlewares, here is the API-REST convention, where is the endpoints
    and do the request to the service, and that is why the next layer is the service, here is where the
    app do the request to the db (business rules) to implement all of the use cases. The last is the db 
    and libs, where are the entities, the models of the data base and their atributes.
*/
