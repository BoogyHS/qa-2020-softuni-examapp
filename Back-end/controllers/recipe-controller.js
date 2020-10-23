const Recipe = require('../models/Recipe');

module.exports = {
    create: async(req, res) => {
        try {
            const recipeData = req.body;
            await Recipe.create({...recipeData });
            res.status(201);
            res.json({ message: 'Recipe created successfully!' });
            res.end();
        } catch (err) {
            res.status(400);
            res.json({ message: err.message });
            res.end();
        }

    },

    getAll: async(req, res) => {
        try {
            const recipes = await Recipe.find();
            res.status(200);
            res.json({ recipes });
            res.end();

        } catch (err) {
            res.status(400);
            res.json({ message: err.message });
            res.end();
        }
    },

    getById: async(req, res) => {
        try {
            const id = req.params.id;
            const recipe = await Recipe.findById(id);
            res.status(200);
            res.json({ recipe });
            res.end();
        } catch (err) {
            res.status(400);
            res.json({ message: err.message });
            res.end();
        }
    },

    edit: async(req, res) => {
        try {
            const id = req.params; // broken: const id = req.params.id
            const newRecipe = req.body;
            const recipe = await Recipe.findByIdAndUpdate(id, newRecipe);
            res.status(200);
            res.json({ message: 'Recipe updated successfully!', recipe });
            res.end();
        } catch (err) {
            res.status(400);
            res.json({ message: err.message });
            res.end();
        }
    },

    delete: async(req, res) => {
        try {
            const id = req.params.id;
            await Recipe.findByIdAndRemove(id);
            res.status(200);
            res.json({ message: 'Recipe removed successfully!' });
            res.end();
        } catch (err) {
            res.status(400);
            res.json({ message: err.message });
            res.end();
        }
    }
}