const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const nodeMailer = require('nodemailer')
const config = require('config')

const mongoURI = "mongodb+srv://ikadimi:JpeykkeH1.@cluster0-voju0.mongodb.net/test?retryWrites=true&w=majority" //"mongodb://localhost:27017/test"
process.env.SECRET_KEY = 'swapSecret01.'
const registre = require("./routes/registre")
const login = require("./routes/login")
const browse = require("./routes/browse")
const settings = require("./routes/settings")

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => console.log("database connected"))
.catch(err => console.log("error: " + err));

let smtpTransport = nodeMailer.createTransport(config.get("Mail"));
global.smtpTransport = smtpTransport;

app.use(cors())
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use('/registre', registre)
app.use('/login', login)
app.use('/browse', browse)
app.use('/settings', settings)

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
