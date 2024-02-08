const db = require('../utils/database');

module.exports = class Contact{
    constructor(id, phoneNumber, email, linkedId, linkPrecedence, createdAt, updatedAt, deletedAt) {
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.linkedId = linkedId;
        this.linkPrecedence = linkPrecedence;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
      }
    
      static fromDatabaseRow(row) {
        return new Contact(
          row.id,
          row.phoneNumber,
          row.email,
          row.linkedId,
          row.linkPrecedence,
          row.createdAt,
          row.updatedAt,
          row.deletedAt
        );
      }
    
      toDatabaseRow() {
        return {
          id: this.id,
          phoneNumber: this.phoneNumber,
          email: this.email,
          linkedId: this.linkedId,
          linkPrecedence: this.linkPrecedence,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
          deletedAt: this.deletedAt
        };
      }
}