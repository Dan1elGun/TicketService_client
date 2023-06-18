import $api from "../http";

export default class DirectionService {
    static async createDirection(code, name, instituteId) {
        return await $api.post('/direction', {code: code, name: name, instituteId: instituteId})
    }

    static async fetchAllDirections() {
        return await $api.get('/direction')
    }

    static async fetchOneDirection(id) {
        return await $api.get(`/direction/${id}`)
    }

    static async updateDirection(id, code, name, instituteId) {
        return await $api.put('/direction', {id: id, code: code, name: name, instituteId: instituteId})
    }

    static async deleteDirection(id) {
        return await $api.delete(`/direction/${id}`)
    }
}