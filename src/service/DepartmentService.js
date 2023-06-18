import $api from "../http";

export default class DepartmentService {
    static async createDepartment(name, instituteId) {
        return await $api.post('/department', {name: name, instituteId: instituteId})
    }

    static async fetchAllDepartments() {
        return await $api.get('/department')
    }

    static async fetchOneDepartment(id) {
        return await $api.get(`/department/${id}`)
    }

    static async updateDepartment(id, name, instituteId) {
        return await $api.put('/department', {id: id, name: name, instituteId: instituteId})
    }

    static async deleteDepartment(id) {
        return await $api.delete(`/department/${id}`)
    }
}