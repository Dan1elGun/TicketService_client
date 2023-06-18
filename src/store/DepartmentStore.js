import {makeAutoObservable} from "mobx";
import DepartmentService from "../service/DepartmentService";

export default class DepartmentStore {
    constructor() {
        this._departments = []
        makeAutoObservable(this)
    }

    setDepartments(departments) {
        this._departments = departments
    }

    get departments() {
        return this._departments
    }

    async loadDepartments() {
        try {
            const response = await DepartmentService.fetchAllDepartments();
            await this.setDepartments(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async createDepartment(name, instituteId) {
        try {
            const response = await DepartmentService.createDepartment(name, instituteId);
            await this.loadDepartments()
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }

    async updateDepartment(id, name, instituteId) {
        try {
            const response = await DepartmentService.updateDepartment(id, name, instituteId);
            await this.loadDepartments()
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }

    async deleteDepartment(id) {
        try {
            const response = await DepartmentService.deleteDepartment(id);
            await this.loadDepartments()
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }
}