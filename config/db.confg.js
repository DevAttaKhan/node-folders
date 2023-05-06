const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("mr-drive", "postgres", "admin", {
    host: "localhost",
    dialect: "postgres",
  });


  module.exports = sequelize;