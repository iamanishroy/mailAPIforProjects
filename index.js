require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mailer = require("./mailer");
const cors = require("cors");

var app = express();
const port = process.env.PORT || 9000;

var allowlist = process.env.SITES.split(",");
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(bodyParser.json());
// respond with "hello world" when a GET request is made to the homepage
app.get("/mail", function (req, res) {
  res.send("this is a CORS enabled mail API for Anish's Projects");
});
app.post("/mail", cors(corsOptionsDelegate), (req, res) => {
  var data = req.body;
  var name = data.name || process.env.DEFAULT_NAME;
  mailer(
    name,
    process.env.DEFAULT_EMAIL,
    process.env.DEFAULT_PASSWORD,
    data.to,
    data.subject,
    data.emailBody
  )
    .then(() => {
      res.status(200).json({ status: "sent" });
    })
    .catch((er) => {
      console.log(er);
      res.status(400).json({ status: "not-sent" });
    });
});

app.listen(port);
