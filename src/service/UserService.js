import $api from "../http";

export default class UserService {

    static async fetchAllUsers() {
        return await $api.get('/user')
    }

    static async fetchOneUser(id) {
        return await $api.get(`/user/${id}`)
    }
}