import $api from "../http";

export default class ProfileService {
    static async createProfile(name, directionId) {
        return await $api.post('/profile', {name: name, directionId: directionId})
    }

    static async fetchAllProfiles() {
        return await $api.get('/profile')
    }

    static async fetchOneProfile(id) {
        return await $api.get(`/profile/${id}`)
    }

    static async updateProfile(id, name, directionId) {
        return await $api.put('/profile', {id: id, name: name, directionId: directionId})
    }

    static async deleteProfile(id) {
        return await $api.delete(`/profile/${id}`)
    }
}