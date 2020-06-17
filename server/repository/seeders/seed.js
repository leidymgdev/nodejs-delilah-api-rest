// Importing Bluebird promises so we can Promise.map
const Promise = require("bluebird");

// Bring in the database and all the Models and data to seed
const database = require("../database");

const statusesData = require("./data/statuses");
const userTypesData = require("./data/userTypes");
const paymentMethodsData = require("./data/paymentMethods");
const usersData = require("./data/users");

const allData = {
  statuses: statusesData,
  usertypes: userTypesData,
  paymentmethods: paymentMethodsData,
  users: usersData,
};

database
  .sync({ force: true })
  .then(function () {
    console.log("Synced DB and dropped old data.");
    return Promise.map(Object.keys(allData), (name) => {
      return Promise.map(allData[name], (element) => {
        return database.model(name).create(element);
      });
    });
  })
  .then(function () {
    console.log("Seeded successfully.");
  })
  .catch(function (err) {
    console.error("Error: ", err, err.stack);
  })
  .finally(function () {
    database.close();
    console.log("Finished.");
    return null;
  });
