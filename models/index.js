var express = require("express");
var Sequelize = require("sequelize");
var dbConfig = require("../config/dbconfig");
const app = express();
app.use(express.json());

var sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    min: dbConfig.pool.min,
    max: dbConfig.pool.max,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});


sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database successfully..");
  })
  .catch((err) => {
    console.error("Unable to connect to db,because" + err);
  });

  module.exports =  {sequelize:sequelize};