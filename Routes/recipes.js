var express = require("express");
var router = express.Router();
var middleware = require("../Middleware");
const Recipe = require("../Models/recipe");

//New
router.get("/recipes/new", middleware.isLoggedIn, function(req, res)
{
    res.render("Recipes/new");
});

//Create
router.post("/Recipes", middleware.isLoggedIn, function(req, res)
{
    //get data from form and add it to recipes array
    var newRecipe = 
    {
        createdDate: middleware.getCurrentDate(),
        editedDate: middleware.getCurrentDate(),
        title: req.body.title,
        image: req.body.image,
        content: req.body.content,
        author: 
        {
            id: req.user._id,
            username: req.user.username
        }
    };

    //Create a new recipe and save to DB
    Recipe.create(newRecipe, function(err, newlyCreatedRecipe)
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            //redirect back to recipes page
            console.log(newlyCreatedRecipe);
            res.redirect("/");
        }
    });
});

//Show

//Edit

//Update

//Destroy

module.exports = router