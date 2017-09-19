// setup 
var express = require("express");
var app = express();

app.set("view engine", "ejs");


// routes
app.get("/", function(req,res){
	res.render("landing");
});


app.get("/downloads", function(req, res){
	var downloads = [
		{name: "PDF 1", image: "#"},
		{name: "PDF 2", image: "#"},
		{name: "PDF 3", image: "#"}
	]
	res.render("downloads",{downloads:downloads});
});





// listening 
app.listen(3001, 'localhost', function() {
  console.log("server has started!!!");
});