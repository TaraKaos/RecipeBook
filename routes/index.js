var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var Recipe = require("../models/recipe");

//root route
router.get("/", function(req, res)
{
    res.render("landing");
});

module.exports = router;