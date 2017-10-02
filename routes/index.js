
// ***************************************************
// INDEX ROUTES 
// ***************************************************

var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");





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


app.get("/backoffice/users", function(req, res){
	User.find({}, function(err, users){
		if(err){
			console.log("ERROR!!!");
		} else {
			res.render("users", {users: users})
		}
	});
});


// CREATE USER
// app.post("/backoffice/users", function(req,res){
// 	// create user
// 	User.create(req.body.user, function(err, newUser){
// 		if(err){
// 			res.render("../register");
// 		}
// 		else{
// 			// then redirect to homepage
// 			res.redirect("../thankyou");	
// 		}
// 		// passport.authenticate("local")(req,res, function(){
// 		// 	res.redirect("downloads");
// 		// });

// 	});

// });

// HANDLE SIGNUP LOGIC

app.post("/backoffice/users", function(req,res){
	var newUser = new User({email: req.body.email});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register")
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/downloads");
		});
	});
});

// SHOW USER ID
app.get("/backoffice/users/:id", function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			res.redirect("/backoffice/users");			
		} else{
			res.render("user_detail", {user: foundUser});
		}
	});
});

// EDIT USER ID

app.get("/backoffice/users/:id/edit", function(req, res){
	User.findById(req.params.id, function(err, foundUser){
		if(err){
			res.redirect("/backoffice/users");
		} else {
			res.render("user_edit", {user: foundUser});
		}
	});
});

// UPDATE ROUTE USER
app.put("/backoffice/users/:id", function(req, res){
	User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
		if(err){
			res.redirect("/backoffice/users");
		} else {
			res.redirect("/backoffice/users/" + req.params.id);
		}
	});
});

// DELETE ROUTE

app.delete("/backoffice/users/:id", function(req, res){
	User.findByIdAndRemove(req.params.id, function(err){
		if(err){
		res.redirect("/backoffice/users");
		} else {
		res.redirect("/backoffice/users");
	}
	})
});


// AUTH ROUTES

app.get("/downloads", isLoggedIn, function(req, res){
	res.render("downloads");
});

// LOGIN ROUTES

//render login form

app.get("/signin", function(req,res){
	res.render("signin");
});

// login logic
// middleware

app.post("/signin", passport.authenticate("local", {
	successRedirect: "/downloads",
	failureRedirect: "/signin"

}) , function(req,res){
});

// LOGOUT ROUTE

app.get("/logout", function(req,res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req,res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};


