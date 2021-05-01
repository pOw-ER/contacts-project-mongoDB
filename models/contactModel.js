const mongoose = require('mongoose')
const { Schema } = mongoose

const newContactItem = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  favorite: Boolean
});

const newContact = mongoose.model('contact', newContactItem)
module.exports = newContact
