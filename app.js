const express = require('express');
const bodyParser = require('body-parser');

require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());



app.listen(port, () => {
  console.log(`Bitespeed server running on port ${port}`);
});