/* globals Sammy, Handlebars */
import homePage from './controllers/home.js';
import { loginPage, registerPage, logoutPage, registerPost, loginPost } from './controllers/user.js';
import { createPage, detailsPage, editPage, createPost, editPost, deleteRecipe, like } from './controllers/recipes.js';

window.addEventListener('load', async() => {
    const app = Sammy('#rooter', function() {
        this.use('Handlebars', 'hbs');

        this.userData = {
            username: sessionStorage.getItem('username'),
            userId: sessionStorage.getItem('userId'),
            names: sessionStorage.getItem('names')
        };

        this.get('/', homePage);
        this.get('#/home', homePage);
        this.get('index.html', homePage);

        this.get('#/register', registerPage);
        this.get('#/login', loginPage);
        this.get('#/logout', logoutPage);

        this.get('#/create', createPage);
        this.get('#/details/:id', detailsPage);
        this.get('#/edit/:id', editPage);

        this.post('#/register', (ctx) => { registerPost.call(ctx); });
        this.post('#/login', (ctx) => { loginPost.call(ctx); });

        this.post('#/create', (ctx) => { createPost.call(ctx); });
        this.post('#/edit/:id', (ctx) => { editPost.call(ctx); });

        this.get('#/delete/:id', deleteRecipe);
        this.get('#/like/:id', like);
    });

    app.run();
});