var express = require("express");
var router = express.Router();
var middleware = require("../middleware");

//root route
router.get("/", middleware.isLoggedIn, function(req, res)
{
    res.render("home");
});

module.exports = router;