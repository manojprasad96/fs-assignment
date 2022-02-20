Spring Boot, React js, MongoDB

Database - Mongo - Insert the below query in mongo db

```
db.type.insertMany([{"_id":1, "name": "Home & Kitchen"},{"_id": 2, "name": "Sports & Outdoors"}])
db.roles.insertMany([{ name: "ROLE_USER" },{ name: "ROLE_ADMIN" }])
```

Backend - Spring boot, MongoDB - Cmd to run back-end - http://localhost:8080

```mvn spring-boot:run``` 


Frontend - React js - Cmd to run front-end - url http://localhost:3000

```yarn & yarn start```

Below are the list of frontend pages:

```
- /login -- USER, ADMIN
- /signup -- USER, ADMIN
- /home -- USER, ADMIN
- /profile -- USER, ADMIN
- /settings -- ADMIN
- /logout -- USER, ADMIN
```

Below are the list of backend API:

/fs/auth:
```
POST - /login
POST - /signup
```

/fs/api:
```
GET - /products
GET - /products/types
GET - /products/valid
GET - /products/valid/search
GET - /products/expired
GET - /products/expired/search
GET - /products/{id}
PUT - /products/{id}
POST - /products
DELETE -/products/{id}
```

