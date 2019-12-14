// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "app/public/home.html")); 
  });

app.get("/:route", function(req, res) {
    var route = req.params.route;
    if (route === "survey") {
        res.sendFile(path.join(__dirname, "app/public/survey.html")); 
    }
    res.sendFile(path.join(__dirname, "app/public/home.html")); 
  });


  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });