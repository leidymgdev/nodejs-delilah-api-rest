require("../database");

const Statuses = require("../models/Statuses");
const Roles = require("../models/Roles");
const PaymentMethods = require("../models/PaymentMethods");
const Users = require("../models/Users");

const statusesData = require("./data/statuses");
const rolesData = require("./data/roles");
const paymentMethodsData = require("./data/paymentMethods");
const usersData = require("./data/users");

const rolesBulkCreate = () =>
  Roles.bulkCreate(rolesData)
    .then(() => Roles.findAll())
    .then((roles) => console.log(`${roles.length} roles created.`));

const statusesBulkCreate = () =>
  Statuses.bulkCreate(statusesData)
    .then(() => Statuses.findAll())
    .then((statuses) => console.log(`${statuses.length} statuses created.`));

const paymentMethodsBulkCreate = () =>
  PaymentMethods.bulkCreate(paymentMethodsData)
    .then(() => PaymentMethods.findAll())
    .then((paymentMethods) =>
      console.log(`${paymentMethods.length} payment methods created.`)
    );

const usersBulkCreate = () =>
  Users.bulkCreate(usersData)
    .then(() => Users.findAll())
    .then((users) => console.log(`${users.length} users created.`));

Promise.all([
  rolesBulkCreate(),
  statusesBulkCreate(),
  paymentMethodsBulkCreate(),
  usersBulkCreate()
])
  .then(() => {
    console.log("Success in bulk create seeders.");
    process.exit();
  })
  .catch((error) => console.error(`Error in bulk create seeders ${error}.`));
