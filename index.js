const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT || 3002
const mongoose = require('mongoose')
const formidable = require('formidable')
const { v4: uuidv4 } = require('uuid');
const contactItem = require('./models//contactModel')
const app = express()
const DBURI = process.env.DBURI

mongoose.connect(DBURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
  console.log('connected to the database');
  app.listen(PORT, () => {
    console.log(`listened port localhast:${PORT}`);
  })
})

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

app.use(express.static('public'))
app.use(express.static('imgUpload'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  contactItem.find()
    .then(contacts => {
      // console.log(contacts);
      res.render('pages/index', { contacts: contacts });
    })
    .catch(err => console.log(err))

})

app.get('/new', (req, res) => {
  res.render('pages/newContact')
})


app.post('/newContact',
  (req, res, next) => {
    const form = formidable({ multiples: true, uploadDir: './imgUpload', keepExtensions: true });

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      // console.log(`${files.profilPic.path.slice(9)} hier ist img`);
      let new_person = new contactItem({
        _id: uuidv4(),
        profile_bild: `${files.profilPic.path.slice(9)}`,
        firstName: fields.fname,
        lastName: fields.lname,
        phoneNumber: fields.telNumber,
        favorite: false,
        organisation: fields.organization,
      }).save()
      res.redirect('/')
      // res.json({ fields, files });
    });
  });
app.get('/details/:id', (req, res) => {
  contactItem.findById(req.params.id)
    .then(item => {
      console.log(item);
      res.render('pages/contactDetails', { contact: item })
    })
    .catch(err => console.log(err))
})
app.get('/delete/:id', (req, res) => {
  contactItem.findByIdAndDelete(req.params.id)
    .then(item => {
      res.redirect('/')
    })
    .catch(err => console.log(err))
})
