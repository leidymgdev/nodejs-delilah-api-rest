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
