const sequelize = require('../utils/database');
const { DataTypes } = require('sequelize');


const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  phoneNumber: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  linkedId: {
    type: DataTypes.INTEGER
  },
  linkPrecedence: {
    type: DataTypes.ENUM('primary', 'secondary')
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE
  }
});

module.exports = Contact;