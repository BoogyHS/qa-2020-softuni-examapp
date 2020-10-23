const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    meal: { type: mongoose.Schema.Types.String, required: true },
    ingredients: [{ type: mongoose.Schema.Types.String, required: true }],
    prepMethod: { type: mongoose.Schema.Types.String, required: true },
    description: { type: mongoose.Schema.Types.String, required: true },
    foodImageURL: { type: mongoose.Schema.Types.String, required: true },
    likes: { type: mongoose.Schema.Types.Number, required: true },
    category: { type: mongoose.Schema.Types.String, required: true },
    categoryImageURL: { type: mongoose.Schema.Types.String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;