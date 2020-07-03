require("../database");

const Statuses = require("../models/Statuses");
const Roles = require("../models/Roles");
const PaymentMethods = require("../models/PaymentMethods");
const Users = require("../models/Users");

const statusesData = require("./data/statuses");
const rolesData = require("./data/roles");
const paymentMethodsData = require("./data/paymentMethods");
const usersData = require("./data/users");

const statusesBulkCreate = () => Statuses.bulkCreate(statusesData);
const rolesBulkCreate = () => Roles.bulkCreate(rolesData);
const paymentMethodsBulkCreate = () =>
  PaymentMethods.bulkCreate(paymentMethodsData);
const usersBulkCreate = () => Users.bulkCreate(usersData);

Promise.all([
  statusesBulkCreate(),
  rolesBulkCreate(),
  paymentMethodsBulkCreate(),
  usersBulkCreate()
])
  .then(() => {
    console.log("Success in bulk create seeders.");
    process.exit();
  })
  .catch((error) => console.error(`Error in bulk create seeders ${error}`));
