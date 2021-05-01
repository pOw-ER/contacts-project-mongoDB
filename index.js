const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 3002
const mongoose = require('mongoose')
const contactItem = require('./models//contactModel')
const app = express()
const DBURI = process.env.DBURI

mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
  console.log('connected to the database');
  app.listen(PORT, () => {
    console.log(`listened port localhast:${PORT}`);
  })
})

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  contactItem.find()
    .then(contacts => {
      console.log(contacts);
      res.render('pages/index', { contacts: contacts });
    })
    .catch(err => console.log(err))

})

app.get('/new', (req, res) => {
  const newPerson = new contactItem({
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '123-456-123',
    favorite: false
  }).save()
  res.redirect('/')
})
