const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const cors = require("cors");
const folderRoutes = require("./routes/folderRoutes");
const mediaRoutes = require("./routes/mediaRoutes");

const app = express();
const corsOptions = {
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/folders", folderRoutes);
app.use("/books", mediaRoutes);

module.exports = app;
