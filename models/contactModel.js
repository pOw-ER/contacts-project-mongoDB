const mongoose = require('mongoose')
const { Schema } = mongoose

const newContactItem = new Schema({
  _id: String,
  profile_bild: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  favorite: Boolean,
  organisation: String
}, { timestamps: true });

const newContact = mongoose.model('contact', newContactItem)
module.exports = newContact
