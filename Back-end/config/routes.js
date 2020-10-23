const controllers = require('../controllers');
const { authenticateToken } = require('./middlewares');

module.exports = app => {
    app.post('/api/users/register', controllers.user.register);
    app.post('/api/users/logout', controllers.user.logout);
    app.post('/api/users/login', controllers.user.login);

    app.put('/api/recipes/edit/:id', authenticateToken, controllers.recipe.edit);
    app.delete('/api/recipes/delete/:id', authenticateToken, controllers.recipe.delete);
    app.get('/api/recipes/:id', authenticateToken, controllers.recipe.getById);
    app.get('/api/recipes', authenticateToken, controllers.recipe.getAll);
    app.post('/api/recipes', authenticateToken, controllers.recipe.create);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};