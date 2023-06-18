import {makeAutoObservable} from "mobx";
import DirectionService from "../service/DirectionService";

export default class DirectionStore {
    constructor() {
        this._directions = []
        makeAutoObservable(this)
    }

    setDirections(directions) {
        this._directions = directions
    }

    get directions() {
        return this._directions
    }

    async loadDrirections() {
        try {
            const response = await DirectionService.fetchAllDirections();
            await this.setDirections(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async createDirection(code, name, instituteId) {
        try {
            const response = await DirectionService.createDirection(code, name, instituteId);
            await this.loadDrirections()
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }

    async updateDirection(id, code, name, instituteId) {
        try {
            const response = await DirectionService.updateDirection(id, code, name, instituteId);
            await this.loadDrirections()
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }

    async deleteDirection(id) {
        try {
            const response = await DirectionService.deleteDirection(id);
            await this.loadDrirections()
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }
}