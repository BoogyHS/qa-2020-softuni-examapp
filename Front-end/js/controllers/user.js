import { register, login, logout, checkResult } from '../data.js';
import { showError, showInfo } from '../notification.js';

export async function registerPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    this.partial('./templates/user/register.hbs', this.app.userData);
}

export async function loginPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    this.partial('./templates/user/login.hbs', this.app.userData);
}

export async function logoutPage() {
    try {
        await logout();

        this.app.userData.username = '';
        this.app.userData.userId = '';
        this.app.userData.names = '';

        showInfo('Logout successful.');
        this.redirect('#/home');
    } catch (err) {
        showError(err.message);
    }
}

export async function registerPost() {
    try {
        if (this.params.firstName.length < 2) {
            throw new Error('First and last names must be at least 2 characters long');
        }
        if (this.params.username.length < 3) {
            throw new Error('Username must be at least 3 characters long');
        }
        if (this.params.password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }
        if (this.params.password != this.params.repeatPassword) {
            throw new Error('Passwords don\'t match');
        }

        const result = await register(
            this.params.username,
            this.params.firstName,
            this.params.lastName,
            this.params.password
        );
        checkResult(result);

        showInfo('User registration successful.');
        this.redirect('#/home');
    } catch (err) {
        showError(err.message);
    }
}

export async function loginPost() {
    try {
        const result = await login(
            this.params.username,
            this.params.password
        );
        checkResult(result);

        this.app.userData.username = result.user.username;
        this.app.userData.userId = result.user._id;
        this.app.userData.names = `${result.user.firstName} ${result.user.lastName}`;

        showInfo('Login successful.');
        this.redirect('#/home');
    } catch (err) {
        showError(err.message);
    }
}