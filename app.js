const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const contactRoutes = require("./routes/contactRoute");

require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(contactRoutes);

sequelize
  // .sync({force:true})
  .sync()
  .then((res) => {
    app.listen(port, () => {
      console.log(`Bitespeed server running at ${port}`);
    });
  });
