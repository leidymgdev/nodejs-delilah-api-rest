module.exports = (database, orm) => {
  return database.define("orderdetails", {
    quantity: {
      type: orm.INTEGER,
      primaryKey: true,
      require: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    price: {
      type: orm.DECIMAL,
      primaryKey: true,
      require: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
  });
};
