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

# Getting Started

This README.md will guide you on how to install and use this API.

NOTE: You can find the specification of the **OpenAPI** in [Open API Docs](https://app.swaggerhub.com/apis/leidymgdev/swagger-delilahresto/1.0.0) or in [this repository](https://github.com/leidymgdev/delilah-api-rest-nodejs/blob/master/server/docs/openApi.yaml)

## Installation and initialization

### Clone the repository or download the zip:

```bash
$ git clone https://github.com/leidymgdev/delilah-api-rest-nodejs.git
```

## To install the dependencies

Use **npm** or **yarn** to install the dependencies

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

Open file [env.variables.json](https://github.com/leidymgdev/delilah-api-rest-nodejs/blob/master/server/config/env.variables.json). In this file you will find configuration variables. Edit the host (**DB_HOST**), username (**DB_USERNAME**) and password (**DB_PASSWORD**) variables with your information.

Tables and associations will generate automatically after initializing server.

## Initialize the server

```bash
cd server
npm start
```

This will install the app in port **8081**. You can edit the port in the file [env.variables.json](https://github.com/leidymgdev/delilah-api-rest-nodejs/blob/master/server/config/env.variables.json). The variable for editing is **PORT**.

If everything is ok you will get the next messages:

- _"API running on port 8081 in environment development"_
- _"Database is synced."_.

Ignore the next warning message: _"Ignoring invalid configuration option passed to Connection: useUTC. This is currently a warning, but in future versions of MySQL2, an error will be thrown if you pass an invalid configuration option to a Connection"._ **Actually this is an open issue only for mysql dialect.**

**Important note:** Tables and associations were created after did this.

You can see the model database [here](https://github.com/leidymgdev/delilah-api-rest-nodejs/tree/master/server/docs/db_delilah.png)

Execute the next script to insert data in roles, statuses, paymentMethods and users tables.

```bash
npm run seed
```

If everything is ok you will get the next messages:

- _"2 roles created."_
- _"6 statuses created."_
- _"1 payment methods created."_
- _"1 users created."_
- _"Success in bulk create seeders."_

Ignore the warning message _"Ignoring invalid configuration option passed to Connection.."_ again.

**Important note:** This information needs to be inserted before testing all endpoints. **This is a master data.**

Then return to execute to start the server again.

```bash
npm start
```

## Checking if it's running correctly

Open this [url](http://localhost:8081/api/v1/) in the browser. (If you changed the PORT variable in **env.variables**.json please change it here too).

You should get a message: **"Welcome to Delilah Resto Rest Api."**

## Testing the API

Use **Postman** or similar apps to try out the different GET, POST, PUT and DELETE requests.

You can verify how the methods work in this [Postman collection](https://www.getpostman.com/collections/e97fa9d611c1d04628da)

Or you can [Run in Postman](https://app.getpostman.com/run-collection/bb3dbfc2335343c607c2)

Also you can find the specification of the **OpenAPI** in this [url](http://localhost:8081/api/v1/docs/) (If you changed the PORT variable in env.variables.json please change it here too).

## METHODS

**Important note:** middlewares check user and admin with a token. To have access to resources with admin privileges, you need to be logged in as a registered admin first.

**Other important note:** Please remember to use JSON for all "body: raw" requests.

## ENDPOINTS

(If you changed the PORT variable in env.variables.json please change it here too. In all endpoints).

## For managing users

### POST - Register a user

http://localhost:8081/api/v1/users

Request body:

```js
    {
        "email": "myemail@email.com",
        "password": "mypassword",
        "username": "myusername",
        "fullname": "my full name",
        "cellphone": "1234567890",
        "shippingAddress": "my shipping address",
        "roleId": 2
    }
```

(**roleId** is an optional parameter.

- It will be saved with id 1 if the property does not come in the request.
- Id **2** makes for **admin privileges** and id **1** is for a **normal client**.)

### POST - Login of user

http://localhost:8081/api/v1/users/login

```js
    {
        "email": "martinezgiraldoleidy@gmail.com",
        "password": "Intel135",
        "username": "leidymgdev",
        "fullname": "Leidy Johanna Martínez Giraldo5",
        "cellphone": "3185273941",
        "shippingAddress": "Carrera 6a # 23 - 23",
        "roleId": 2
    }
```

This endpoint responses a **token**. This token must be used in the others endpoints (products and orders).

```js
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZUlkIjoxLCJpYXQiOjE1OTM5OTk2MzksImV4cCI6MTU5NDE3MjQzOX0.56790l9gC2FQsjH9uIwKWih7xmgRZA1dlVg4PaZKZic"
    }
```

## For managing products

### POST - Products

http://localhost:8081/api/v1/products

- _You need to send the token in the **Headers** with **auth-token** key_
- _You need **admin privileges** via **roleId 2**_

```js
    {
        "description": "Menu",
        "price": 10000
    }
```

### GET - Products

http://localhost:8081/api/v1/products

- _You need to send the token in the **Headers** with **auth-token** key_

### PUT - Products

http://localhost:8081/api/v1/products/:id

- _You need to send the token in the **Headers** with **auth-token** key_
- _You need **admin privileges** via **roleId 2**_

```js
    {
        "description": "Menú",
        "price": 10000
    }
```

### DELETE - Products

http://localhost:8081/api/v1/products/:id

- _You need to send the token in the **Headers** with **auth-token** key_
- _You need **admin privileges** via **roleId 2**_

## For managing orders

## POST - Orders

http://localhost:8081/api/v1/orders

- _You need to send the token in the **Headers** with **auth-token** key_

```js
    {
        "paymentMethodId": 1,
        "products": [
            {
                "id": 1,
                "quantity": 1
            }
        ]
    }
```

### GET - All orders

http://localhost:8081/api/v1/orders

- _You need to send the token in the **Headers** with **auth-token** key_

Admin can see all orders and normal client only can see their orders.

### GET - Order by id order

http://localhost:8081/api/v1/orders/:id

- _You need to send the token in the **Headers** with **auth-token** key_

Admin can see whatever specific order and normal client only can see an order if its own.

### PUT - Orders (change status)

http://localhost:8081/api/v1/orders/:id

- _You need to send the token in the **Headers** with **auth-token** key_
- _You need **admin privileges** via **roleId 2**_

```js
    {
        "statusId": 2
    }
```
