var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require('mongoose'),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOveride = require("method-override"),
    User          = require("./Models/user");

//requiring routes
var indexRoutes  = require("./Routes/index"),
    authRoutes   = require("./Routes/auth"),
    recipeRoutes = require("./Routes/recipes");

var dbURL = process.env.RECIPE_BOOK_DB_URL || "mongodb://localhost:27017/recipebook";
var dbOptions = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

mongoose.connect(dbURL, dbOptions)
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/Public"));
app.use(methodOveride("_method"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "This is my secret",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next)
{
    res.locals.currentUser = req.user;
    next();
});

// setup routes
app.use(indexRoutes);
app.use(authRoutes);
app.use(recipeRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function()
{
    console.log("The Recipe Book server has started!");
});