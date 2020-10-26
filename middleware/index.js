// all the middleware goes here
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next)
{
	if (req.isAuthenticated())
	{
		return next();
	}
	
	res.redirect("/");
}

middlewareObj.getCurrentDate = function()
{
	var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
	today = mm + '/' + dd + '/' + yyyy;
	
	return today;
}

module.exports = middlewareObj;