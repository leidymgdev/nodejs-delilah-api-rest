# REST API DELILAH RESTO

**A REST API for managing orders, products and users.**

In this API you can allow users to register and login and manage products and orders.

## Technologies and packages used for development

- Node.js
- Express
- MySQL
- Sequelize (ORM for MySQL).
- JSON Web Tokens (JWT)
- dotenv (for managing environment variables)
- cors (for enable cross-origin resource sharing)
- @hapi/joi (for data validation)
- bcryptjs (for hash password)
- swagger-jsdoc and swagger-ui-express (for document code with OpenAPI / Swagger)

## Getting Started

This README.md will guide you on how to install and use this API.

NOTE: You can also find the specification of the OpenAPI in [Open API Docs](https://github.com/leidymgdev/delilah-api-rest-nodejs/blob/master/server/docs/openApi.yaml)

## Installation and initialization

### Clone the repository or download the zip:

```bash
$ git clone https://github.com/leidymgdev/delilah-api-rest-nodejs.git
```

## To install the dependencies

Use npm or yarn to install the dependencies

```bash
$ npm install
```

```bash
$ yarn install
```

## Dependencies used

```json
"dependencies": {
    "@hapi/joi": "^17.1.1",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.15.2",
    "jsonwebtoken": "^8.5.1",
    "mysql2": "^2.1.0",
    "sequelize": "^6.1.0",
    "swagger-jsdoc": "^4.0.0",
    "swagger-ui-express": "^4.1.4",
    "yamljs": "^0.3.0"
  }
```

## Configure the database

### Create database

Open a new query in mysql and execute:

```bash
CREATE DATABASE IF NOT EXISTS delilahresto
```

Open file [env.variables.json](https://github.com/leidymgdev/delilah-api-rest-nodejs/blob/master/server/config/env.variables.json). In this file you will find configuration variables. Edit the host (DB_HOST), username (DB_USERNAME) and password (DB_PASSWORD) variables with your information.

Tables and associations will generate automatically after initializing server.

## Initialize the server

```bash
cd server
npm start
```

This will install the app in port 8081. You can edit the port in the file [env.variables.json](https://github.com/leidymgdev/delilah-api-rest-nodejs/blob/master/server/config/env.variables.json). The variable for editing is PORT.

## Checking if it's running correctly

Open the [env.variables.json](http://localhost:8081/api/v1/) in the browser.

You should get a message: "Welcome to Delilah Resto Rest Api."

## Testing the API

Use Postman or similar apps to try out the different GET, POST, PUT and DELETE requests.

You can verify how the methods work in this [Postman collection](https://www.getpostman.com/collections/e97fa9d611c1d04628da)

Or you can [[Run in Postman](https://app.getpostman.com/run-collection/bb3dbfc2335343c607c2)
