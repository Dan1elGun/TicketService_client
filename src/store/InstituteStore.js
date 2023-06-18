import {makeAutoObservable} from "mobx";
import InstituteService from "../service/InstituteService";

export default class InstituteStore {
    constructor() {
        this._institutes = []
        makeAutoObservable(this)
    }

    setInstitutes(institutes) {
        this._institutes = institutes
    }

    get institutes() {
        return this._institutes
    }

    async loadInstitutes() {
        try {
            const response = await InstituteService.fetchAllInstitutes();
            await this.setInstitutes(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async createInstitute(name) {
        try {
            const response = await InstituteService.createInstitute(name);
            await this.loadInstitutes()
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }

    async updateInstitute(id, name) {
        try {
            const response = await InstituteService.updateInstitute(id, name);
            await this.loadInstitutes()
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }

    async deleteInstitute(id) {
        try {
            const response = await InstituteService.deleteInstitute(id);
            await this.loadInstitutes()
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }
}