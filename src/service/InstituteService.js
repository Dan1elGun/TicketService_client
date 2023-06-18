import $api from "../http";

export default class InstituteService {
    static async createInstitute(name) {
        return await $api.post('/institute', {name: name})
    }

    static async fetchAllInstitutes() {
        return await $api.get('/institute')
    }

    static async fetchOneInstitute(id) {
        return await $api.get(`/institute/${id}`)
    }

    static async updateInstitute(id, name) {
        return await $api.put('/institute', {id: id, name: name})
    }

    static async deleteInstitute(id) {
        return await $api.delete(`/institute/${id}`)
    }
}