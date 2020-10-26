var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// Show login page
router.get("/auth/login", function(req, res)
{
	res.render("/auth/login");
});

// handling login logic
router.post("/auth/login", passport.authenticate("local", 
	{
		successRedirect: "/", 
		failureRedirect: "/"
    }), function (req, res){   
});

// logout route
router.get("/auth/logout", function(req, res)
{
	req.logout();
	res.redirect("/");
});

//handle sign up logic
router.post("/auth/register", function(req, res)
{
	var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user)
    {
		if (err)
		{
			console.log(err);
			return res.render("auth/register");
		}
        passport.authenticate("local")(req, res, function()
        {
			res.redirect("/");
		});
	});
});

// show register form
router.get("/auth/register", function(req, res)
{
	res.render("/auth/register");
});

module.exports = router;