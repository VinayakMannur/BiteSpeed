const Contact = require('../models/contactModel');

exports.identify =async (req, res) => {
    const { email, phoneNumber } = req.body;

    console.log(email, phoneNumber);
}