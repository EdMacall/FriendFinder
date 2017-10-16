// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Create an instance of the express app.
var app = express();

// Specify the port.
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static(path.join(__dirname)));

// Routes
app.get("/icecream/:name", function(req, res) {


});

app.get("/icecreams", function(req, res) {


});

// Initiate the listener.
app.listen(port, function() 
{
  console.log("App listening on PORT " + port);
});


