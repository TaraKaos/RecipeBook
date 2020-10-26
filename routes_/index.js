var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var Recipe = require("../models/recipe");

//root route
router.get("/", middleware.isLoggedIn, function(req, res)
{
    //Get all recipes the user has created
    Recipe.find({ author: { id: req.user._id, username: req.user.username } }, function(err, userRecipes)
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            res.render("./recipes/index", {recipes: userRecipes});
        }
    });
});

module.exports = router;