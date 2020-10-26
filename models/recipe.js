var mongoose = require("mongoose");

var recipeSchema = new mongoose.Schema(
{
    createdDate: String,
    editedDate: String,
    title: String,
    image: String,
    ingredients: String,
    directions: String,
    author:
    {
        id:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Recipe", recipeSchema);