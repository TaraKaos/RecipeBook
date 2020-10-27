var express = require("express");
const { isLoggedIn } = require("../middleware");
var router = express.Router();
var middleware = require("../middleware");
const Recipe = require("../models/recipe");

//Showall
router.get("/recipes", middleware.isLoggedIn, function(req, res)
{
    //Get all recipes the user has created
    Recipe.find({ author: { id: req.user._id, username: req.user.username } }, function(err, userRecipes)
    {
        if (err)
        {
            console.log(err);
            req.flash("error", err.message);
        }
        else
        {
            res.render("./recipes/index", {recipes: userRecipes});
        }
    });
});

//New
router.get("/recipes/new", middleware.isLoggedIn, function(req, res)
{
    res.render("recipes/new");
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
        ingredients: req.body.ingredients,
        directions: req.body.directions,
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
            req.flash("error", err.message);
            res.redirect("/recipes");
        }
        else
        {
            //redirect back to recipes page
            console.log(newlyCreatedRecipe);
            req.flash("success", "Created " + newlyCreatedRecipe.title + " recipe");
            res.redirect("/recipes");
        }
    });
});

//Show
router.get("/recipes/:id", middleware.isLoggedIn, function(req, res)
{
    //find the recipe with provided ID
    Recipe.findOne({_id: req.params.id}, function(err, foundRecipe)
    {
        if (err || foundRecipe == null)
        {
            console.log(err);
            req.flash("error", "Recipe not found");
            res.redirect("/recipes");
        }
        else
        {
            console.log(foundRecipe);

            //render show template with that recipe
            res.render("recipes/show", {recipe: foundRecipe});
        }
    });
});

//Edit
router.get("/recipes/:id/edit", middleware.isLoggedIn, function(req, res)
{
    //find the recipe with provided ID
    Recipe.findOne({_id: req.params.id}, function(err, foundRecipe)
    {
        if (err || foundRecipe == null)
        {
            console.log(err);
            req.flash("error", "Recipe not found");
            res.redirect("/recipes");
        }
        else
        {
            console.log(foundRecipe);

            //render edit template with that recipe
            res.render("recipes/edit", {recipe: foundRecipe});
        }
    });
});

//Update
router.put("/recipes/:id", middleware.isLoggedIn, function(req, res)
{
    //find the recipe with provided ID
    Recipe.findByIdAndUpdate(req.params.id, req.body.recipe, function(err, foundRecipe)
    {
        if (err)
        {
            console.log(err);
            req.flash("error", err.message);
            res.redirect("/recipes");
        }
        else
        {
            req.flash("success", "Updated " + foundRecipe.title + " recipe");
            res.redirect("/recipes/" + req.params.id);
        }
    });
});

//Destroy
router.delete("/recipes/:id", middleware.isLoggedIn, function(req, res)
{
    Recipe.findByIdAndRemove(req.params.id, function(err, recipeRemoved)
    {
        if (err)
        {
            console.log(err);
            req.flash("error", err.message);
        }

        req.flash("success", "Deleted " + recipeRemoved.title + " recipe");
        res.redirect("/recipes");
    });
});

module.exports = router