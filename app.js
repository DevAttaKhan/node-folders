const { Sequelize, DataTypes } = require("sequelize");
const express = require("express");
const cors = require("cors");
const folderRoutes = require("./routes/folderRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();
const corsOptions = {
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/user', userRoutes)
app.use("/folders", folderRoutes);
app.use("/medias", mediaRoutes);

 

module.exports = app;
