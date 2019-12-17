// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require('fs');
var friends = require("./app/data/friends.js");
var htmlRoutes = require("./app/routing/htmlRoutes.js");
var apiRoutes = require("./app/routing/apiRoutes.js");
//console.log(friends);

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//console.log(htmlRoutes);  
htmlRoutes(app);
apiRoutes(app);

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});