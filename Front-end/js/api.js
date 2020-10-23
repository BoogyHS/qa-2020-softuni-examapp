const port = 5555;

export default class API {
    constructor(beginRequest, endRequest) {
        this.endpoints = {
            REGISTER: 'api/users/register',
            LOGIN: 'api/users/login'
        };

        this.beginRequest = () => {
            if (beginRequest) {
                beginRequest();
            }
        };
        this.endRequest = () => {
            if (endRequest) {
                endRequest();
            }
        };
    }

    host(endpoint) {
        return `https://qa-2020-softuni.herokuapp.com/${endpoint}`;
    }

    getOptions(headers) {
        const token = sessionStorage.getItem('userToken');

        const options = { headers: headers || {} };

        if (token !== null) {
            Object.assign(options.headers, { 'token': token });
        }

        return options;
    }

    async get(endpoint) {
        this.beginRequest();

        const result = await fetch(this.host(endpoint), this.getOptions());
        try {
            return await result.json();
        } catch (err) {
            return result;
        } finally {
            this.endRequest();
        }
    }

    async post(endpoint, body) {
        const options = this.getOptions({ 'Content-Type': 'application/json' });

        options.method = 'POST';
        options.body = JSON.stringify(body);

        this.beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        this.endRequest();

        return result;
    }

    async put(endpoint, body) {
        const options = this.getOptions({ 'Content-Type': 'application/json' });

        options.method = 'PUT';
        options.body = JSON.stringify(body);

        this.beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        this.endRequest();

        return result;
    }

    async delete(endpoint) {
        const options = this.getOptions();

        options.method = 'DELETE';

        this.beginRequest();
        const result = (await fetch(this.host(endpoint), options)).json();
        this.endRequest();

        return result;
    }

    async register(username, firstName, lastName, password) {
        return this.post(this.endpoints.REGISTER, {
            username,
            firstName,
            lastName,
            password
        });
    }

    async login(username, password) {
        const result = await this.post(this.endpoints.LOGIN, {
            username,
            password
        });

        sessionStorage.setItem('userToken', result['jwt']);
        sessionStorage.setItem('username', result.user.username);
        sessionStorage.setItem('userId', result.user._id);
        sessionStorage.setItem('names', `${result.user.firstName} ${result.user.lastName}`);
        return result;
    }

    async logout() {
        sessionStorage.removeItem('userToken');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('names');
    }
}