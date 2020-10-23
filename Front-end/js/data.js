import { beginRequest, endRequest } from './notification.js';
import API from './api.js';

const endpoints = {
    RECIPES: 'api/recipes/'
};

const api = new API(
    beginRequest,
    endRequest);

export const login = api.login.bind(api);
export const register = api.register.bind(api);
export const logout = api.logout.bind(api);

export function checkResult(result) {
    if (result.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, result);
        throw error;
    }
}

// catalog - all recipes
export async function getAll() {
    return api.get(endpoints.RECIPES);
}

// create recipe
export async function createRecipe(recipe) {
    return api.post(endpoints.RECIPES, recipe);
}

// get recipe by ID
export async function getById(id) {
    return api.get(endpoints.RECIPES + id);
}

// edit recipe
export async function editRecipe(id, recipe) {
    return api.put(endpoints.RECIPES + 'edit/' + id, recipe);
}

// delete recipe
export async function deleteRecipe(id) {
    return api.delete(endpoints.RECIPES + 'delete/' + id);
}

// like recipe
export async function likeRecipe(id) {
    const { recipe } = await getById(id);
    return await editRecipe(id, { likes: recipe.likes + 2 });
}