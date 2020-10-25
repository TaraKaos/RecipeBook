var mongoose = require("mongoose");

var recipeSchema = new mongoose.Schema(
{
    createdDate: String,
    editedDate: String,
    title: String,
    image: String,
    content: String,
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