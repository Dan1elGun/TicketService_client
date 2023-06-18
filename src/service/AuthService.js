import $api from "../http";

export default class AuthService {
    static async login(email, password) {
        return await $api.post('/auth/login', {email: email, password: password})
    }

    static async registration(email, password) {
        return await $api.post('/auth/registration', {email: email, password: password})
    }

    static async logout() {
        return await $api.post('/auth/logout')
    }

}