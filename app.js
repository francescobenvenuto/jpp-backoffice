/**
	Node.js Backoffice
	More Info : http://francescobenvenuto.com/building-a-backoffice-system-in-node-js-and-mongodb/
	Copyright (c) 2017 Francesco Benvenuto
**/

// ***************************************************
// INITIAL SETUP 
// ***************************************************

var express    = require("express"),
	app        = express(),
    path       = require("path"),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose"),
	nodemailer = require('nodemailer'),
	methodOverride = require("method-override");




app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));


// ES6 promises
mongoose.Promise = Promise;

// ***************************************************
// MONGODB CONNECTION 
// ***************************************************

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


// ***************************************************
// DB SCHEMA SETUP 
// ***************************************************

var jppSchema = new mongoose.Schema({
	name: String,
	lastname: String,
	email: String,
	website: String,
	telephone: String,
	address: String,
	vatNumber: String,
	password: String,
	date: {type: Date, dafault: Date.now},
	active: { type: Boolean, default: false }
});

var Jpp = mongoose.model("Jpp", jppSchema);

// ***************************************************
// TEST DATABASE BY CREATING ONE RECORD MANUALLY 
// ***************************************************

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
// }, 

// function(err, jpp){
// 	if(err){
// 		console.log(err);
// 	}
// 		else {
// 			console.log("New user created: ");
// 			console.log(jpp);
// 		}
// });




// ***************************************************
// ROUTES 
// ***************************************************

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


app.get("/backoffice", function(req,res){
	res.render("backoffice");
});


// NEW ROUTE
app.get("/register", function(req, res){
	res.render("register");
});


app.get("/thankyou", function(req, res){
	res.render("thankyou");
});


app.get("/users", function(req, res){
	Jpp.find({}, function(err, users){
		if(err){
			console.log("ERROR!!!");
		} else {
			res.render("users", {users: users})
		}
	});
});


// CREATE USER
app.post("/users", function(req,res){
	// create user
	Jpp.create(req.body.jpp, function(err, newUser){
		if(err){
			res.render("register");
		}
		else{
			// then redirect to homepage
			res.redirect("thankyou");	
		}
	});

});


// SHOW USER ID
app.get("/users/:id", function(req, res){
	Jpp.findById(req.params.id, function(err, foundUser){
		if(err){
			res.redirect("/users");			
		} else{
			res.render("user_detail", {user: foundUser});
		}
	});
});

// EDIT USER ID

app.get("/users/:id/edit", function(req, res){
	Jpp.findById(req.params.id, function(err, foundUser){
		if(err){
			res.redirect("/users");
		} else {
			res.render("user_edit", {user: foundUser});
		}
	});
});

// UPDATE ROUTE USER
app.put("/users/:id", function(req, res){
	Jpp.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
		if(err){
			res.redirect("/users");
		} else {
			res.redirect("/users/" + req.params.id);
		}
	});
});

// DELETE ROUTE

app.delete("/users/:id", function(req, res){
	Jpp.findByIdAndRemove(req.params.id, function(err){
		if(err){
		res.redirect("/users");
		} else {
		res.redirect("/users");
	}
	})
});


// ***************************************************
// LISTENING 
// ***************************************************

app.listen(3001, 'localhost', function() {
  console.log("server has started!!!");
});


