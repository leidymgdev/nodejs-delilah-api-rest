module.exports = (database, orm) => {
  return database.define("products", {
    id: {
      type: orm.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: orm.STRING,
      require: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    price: {
      type: orm.DECIMAL,
      require: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    stock: {
      type: orm.INTEGER,
      require: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
    image: {
      type: orm.STRING,
      require: true,
      allowNull: false,
      validate: { notEmpty: true },
    },
  });
};
