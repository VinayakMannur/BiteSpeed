const express = require('express');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoute');

require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

app.use(contactRoutes);

app.listen(port, () => {
  console.log(`Bitespeed server running on port ${port}`);
});