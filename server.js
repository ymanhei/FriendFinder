// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
const fs = require('fs');
var friends = require("./app/data/friends.js");
//console.log(friends);

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//console.log(htmlRoutes);  
//htmlRoutes();

app.get("/", function(req, res) {
  //console.log(path.join(__dirname, "../public/home.html"));
  res.sendFile(path.join(__dirname, "/app/public/home.html")); 
});

app.get("/:route", function(req, res) {
  var route = req.params.route;
  //console.log(route);
  if (route === "survey") {
    //console.log(path.join(__dirname, "/app/public/survey.html"));
      res.sendFile(path.join(__dirname, "/app/public/survey.html")); 
  }
  else {
      res.sendFile(path.join(__dirname, "/app/public/home.html")); 
  }
});

app.get("/api/friends", function(req, res) {
  //console.log(path.join(__dirname, "../public/home.html"));
  res.json(friends); 
});

app.post("/api/friends", function(req, res) {

  var newfriend = req.body;
  //console.log(friends.length);
  var smallest_difference = 1000;
  var closest_match = "";
for (var i = 0; i < friends.length; i++) {
  var current_difference = 0;
  for (var j = 0; j < friends[i].scores.length; j++) {
    //console.log("Calculation: " + friends[i].scores[j] + newfriend.scores[j]);

    current_difference += Math.abs(parseInt(friends[i].scores[j]) - parseInt(newfriend.scores[j]));
  }
  console.log("Name: " + friends[i].name + " || CD: " + current_difference);

if (current_difference < smallest_difference) {
  smallest_difference = current_difference;
  closest_match = friends[i].name
}
}

var best_match_obj;
for (var i = 0; i < friends.length; i++) {
  if (closest_match === friends[i].name){
    best_match_obj = friends[i];
  }

}

console.log("Best Match: " + closest_match);

  
  //console.log(newfriend);
   friends.push(newfriend);
    res.json(best_match_obj);
    //console.log(friends);
    fs.writeFile('./app/data/friends.js', "var friends = \n" + JSON.stringify(friends) +  "\nmodule.exports = friends;" , (err) => {
      if (err) reject(err)
      
    })
}); 

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});