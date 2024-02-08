const Contact = require("../models/contactModel");
const { Op } = require("sequelize");

exports.identify = async (req, res) => {
  const { email, phoneNumber } = req.body;
  // console.log(email, phoneNumber);

  if (!email && !phoneNumber) {
    return res.status(400).json({ error: "Email or phoneNumber is required" });
  }

  try {
    const contacts = await Contact.findAll({
      where: {
        [Op.or]: [{ email }, { phoneNumber }],
      },
    });

    console.log(contacts);

    if (contacts.length === 0) {
      // No contacts found
      const newContact = await Contact.create({
        phoneNumber,
        email,
        linkPrecedence: "primary",
      });
      // console.log(newContact.id);
      const primaryContatctId = newContact.id;

      return res.status(200).json({
        contact: {
          primaryContatctId,
          emails: [email],
          phoneNumbers: [phoneNumber],
          secondaryContactIds: [],
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
