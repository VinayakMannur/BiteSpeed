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

    // console.log(contacts);

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

    const primaryContact = contacts.find(
      (contact) => contact.linkPrecedence === "primary"
    );
    const primaryContactId = primaryContact.id;
    const emails = contacts.map((contact) => contact.email).filter(Boolean);
    const phoneNumbers = contacts
      .map((contact) => contact.phoneNumber)
      .filter(Boolean);
    const secondaryContactIds = contacts
      .filter((contact) => contact.linkPrecedence === "secondary")
      .map((contact) => contact.id);

    
    if (
      (email && !emails.includes(email)) ||
      (phoneNumber && !phoneNumbers.includes(phoneNumber))
    ) {
      const newSecondaryContact = await Contact.create({
        phoneNumber,
        email,
        linkedId: primaryContactId,
        linkPrecedence: "secondary",
      });
      secondaryContactIds.push(newSecondaryContact.id);
    }

    return res.status(200).json({
      contact: {
        primaryContactId,
        emails,
        phoneNumbers,
        secondaryContactIds,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
