module.exports = (database, orm) => {
  return database.define("users", {
    id: {
      type: orm.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: orm.STRING,
      require: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    password: {
      type: orm.STRING,
      require: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    username: {
      type: orm.STRING,
      require: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    fullname: {
      type: orm.STRING,
      require: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    cellphone: {
      type: orm.STRING,
      require: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    shippingAddress: {
      type: orm.STRING,
      require: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
  });
};
