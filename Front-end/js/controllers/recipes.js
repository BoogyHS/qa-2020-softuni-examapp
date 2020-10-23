import { getById, createRecipe, editRecipe, checkResult, deleteRecipe as apiDelete, likeRecipe } from '../data.js';
import { showError, showInfo } from '../notification.js';

const categories = {
    '0': null,
    '1': { name: 'Vegetables and legumes/beans', url: 'http://tastethefood.weebly.com/uploads/5/2/4/1/52410647/680875.jpg' },
    '2': { name: 'Fruits', url: 'http://www.builtlean.com/wp-content/uploads/2013/05/fruits-to-help-fat-loss.jpg' },
    '3': { name: 'Grain Food', url: 'https://www.world-grain.com/ext/resources/images/g/r/a/i/n/d/e/d/d/d/10/GrainFoods_Embedded.jpg' },
    '4': { name: 'Milk, cheese, eggs and alternatives', url: 'http://www.findhomeremedy.com/wp-content/uploads/2013/07/Milk-cheese-eggs1.jpg' },
    '5': { name: 'Lean meats and poultry, fish and alternatives', url: 'https://www.eatforhealth.gov.au/sites/default/files/images/the_guidelines/lean_meats_food_group_75650673_8_web.jpg' }
};


export async function detailsPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        catalog: await this.load('./templates/catalog/catalog.hbs'),
        recipe: await this.load('./templates/catalog/recipe.hbs')
    };

    const id = this.params.id;
    const { recipe } = await getById(id);
    if (this.app.userData.userId === recipe.creator) {
        recipe.canEdit = true;
    }
    const context = Object.assign({ recipe }, this.app.userData);

    this.partial('./templates/catalog/details.hbs', context);
}

export async function createPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    this.partial('./templates/catalog/create.hbs', this.app.userData);
}

export async function editPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    const id = this.params.id;
    const { recipe } = await getById(id);
    const context = Object.assign({ recipe }, this.app.userData);

    await this.partial('./templates/catalog/edit.hbs', context);

    document.querySelectorAll('select[name=category]>option').forEach(s => {
        if (s.textContent === recipe.category) {
            s.selected = true;
        }
    });
}

export async function createPost() {
    const recipe = {
        meal: this.params.meal,
        ingredients: this.params.ingredients.split(',').map(i => i.trim()),
        prepMethod: this.params.prepMethod,
        description: this.params.description,
        foodImageURL: this.params.foodImageURL,
        likes: 0
    };

    try {
        if (recipe.meal.length < 4) {
            throw new Error('Meal name must be at least 4 characters long');
        }
        if (recipe.ingredients.length < 2) {
            throw new Error('Recipe must have at least 2 ingredients');
        }
        if (recipe.prepMethod.length < 10) {
            throw new Error('Preparation method must be at least 10 characters long');
        }
        if (recipe.description.length < 10) {
            throw new Error('Preparation method must be at least 10 characters long');
        }
        if (this.params.category === '0') {
            throw new Error('Please, select a category from the list');
        }

        recipe.category = categories[this.params.category].name;
        recipe.categoryImageURL = categories[this.params.category].url;
        recipe.creator = sessionStorage.getItem('userId');
        const result = await createRecipe(recipe);
        checkResult(result);

        showInfo('Recipe shared successfully!');
        this.redirect('#/home');
    } catch (err) {
        showError(err.message);
    }
}

export async function editPost() {
    const id = this.params.id;

    const recipe = {
        meal: this.params.meal,
        ingredients: this.params.ingredients.split(',').map(i => i.trim()),
        prepMethod: this.params.prepMethod,
        description: this.params.description,
        foodImageURL: this.params.foodImageURL
    };

    try {
        if (recipe.meal.length < 4) {
            throw new Error('Meal name must be at least 4 characters long');
        }
        if (recipe.ingredients.length < 2) {
            throw new Error('Recipe must have at least 2 ingredients');
        }
        if (recipe.prepMethod.length < 10) {
            throw new Error('Preparation method must be at least 10 characters long');
        }
        if (recipe.description.length < 10) {
            throw new Error('Preparation method must be at least 10 characters long');
        }
        if (this.params.category === '0') {
            throw new Error('Please, select a category from the list');
        }

        recipe.category = categories[this.params.category].name;
        recipe.categoryImageURL = categories[this.params.category].url;

        const result = await editRecipe(id, recipe);
        checkResult(result);

        showInfo('Recipe edited successfully!');
        this.redirect('#/home');
    } catch (err) {
        showError(err.message);
    }
}

export async function deleteRecipe() {
    const id = this.params.id;

    try {
        await apiDelete(id);
        showInfo('Your recipe was archived.');
        this.redirect('#/home');
    } catch (err) {
        showError(err.message);
    }
}

export async function like() {
    const id = this.params.id;

    try {
        await likeRecipe(id);
        showInfo('You liked that recipe.');
        this.redirect('#/home');
    } catch (err) {
        showError(err.message);
    }
}