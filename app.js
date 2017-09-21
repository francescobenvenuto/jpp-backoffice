// setup 
var express    = require("express"),
	app        = express(),
    path       = require("path"),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose")


// ES6 promises
mongoose.Promise = Promise;

// mongodb connection
mongoose.connect("mongodb://localhost/jpp", {
  useMongoClient: true,
  promiseLibrary: global.Promise
});

var db = mongoose.connection;

// mongodb error
db.on('error', console.error.bind(console, 'connection error:'));

// mongodb connection open
db.once('open', () => {
  console.log(`Connected to Mongo at: ${new Date()}`)
});


// DATABASE SCHEMA SETUP

var jppSchema = new mongoose.Schema({
	name: String,
	lastname: String,
	email: String,
	website: String,
	telephone: String,
	indirizzo: String,
	numeroPartitaIva: String,
	password: String
});



// Jpp.create(
// 	{
// 		name: "Francesco",
// 		lastname: "Benvenuto",
// 		email: "benvenutofrancesco@gmail.com",
// 		website: "http://www.francescobenvenuto.com",
// 		telephone: "00393495765703",
// 		indirizzo: "Via Paolo Sarpi 5",
// 		numeroPartitaIva: "IT0123456789",
// 		password: "test"

// }, function(err, jpp){
// 	if(err){
// 		console.log(err);
// 	}
// 		else {
// 			console.log("New user created: ");
// 			console.log(jpp);
// 		}
// });

var Jpp = mongoose.model("Jpp", jppSchema);








app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

// routes
app.get("/", function(req,res){
	res.render("landing");
});

app.get("/signin", function(req,res){
	res.render("signin");
});

app.get("/downloads", function(req, res){
	var downloads = [
		{name: "PDF 1", image: "#"},
		{name: "PDF 2", image: "#"},
		{name: "PDF 3", image: "#"}
	]
	res.render("downloads",{downloads:downloads});
});

app.get("/register", function(req, res){
	res.render("register");
});





// listening 
app.listen(3001, 'localhost', function() {
  console.log("server has started!!!");
});


