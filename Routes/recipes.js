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
router.post("/recipes", middleware.isLoggedIn, function(req, res)
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
router.get("/recipes/:id", function(req, res)
{
    //find the recipe with provided ID
    Recipe.findOne({_id: req.params.id}, function(err, foundRecipe)
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log(foundRecipe);

            //render show template with that recipe
            res.render("Recipes/show", {recipe: foundRecipe});
        }
    });
});

//Edit

//Update

//Destroy

module.exports = router