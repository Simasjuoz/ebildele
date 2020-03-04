if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const Datastoe = require('nedb')
const multer =require('multer');
const upload = multer({})

const database = new Datastoe({ filename: 'database.db', autoload: true })
const databasenum = new Datastoe({ filename: 'databasenum.db', autoload: true })
database.loadDatabase();
databasenum.loadDatabase();

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = []

async function addAdmin(){
  const hashedPassword = await bcrypt.hash("simas1", 10)
  users.push({
    id: Date.now().toString(),
    name: "irmis",
    email: "simas",
    password: hashedPassword
  })
}
addAdmin();

app.use(express.urlencoded({ extended: false }))
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json({limit: '1gb'}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', function(req, res){
  res.sendfile('index.html', { root: __dirname + "/public" } );
});

app.get('/a', checkAuthenticated, (req, res) => {
  res.render('admin.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.post('/file_upload', upload.single('image'), (req, res) => {
  const encoded = {base64: 'data:image/jpg;base64,' + req.file.buffer.toString('base64')};
  database.insert(encoded);

  res.redirect('a')
  
})

app.post('/sendimgdata', (req, res) => {

  databasenum.insert(req.body)

})

app.get('/sendimgdata', (req, res) => {

  databasenum.find({}, (err,docs)=>{
    res.json(docs);
  })

})

app.get('/file_upload', (req, res) => {
  database.find({}, (err, docs) => {
      res.json(docs);
  })
})


app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/a',
  failureRedirect: '/login',
  failureFlash: true
}))



app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/page?')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}
const port = process.env.PORT || 3000
app.use( express.static( "public" ) );
app.listen(port)