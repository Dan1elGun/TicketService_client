import {makeAutoObservable} from "mobx";
import ProfileService from "../service/ProfileService";

export default class ProfileStore {
    constructor() {
        this._profiles = []
        makeAutoObservable(this)
    }

    setProfiles(profiles) {
        this._profiles = profiles
    }

    get profiles() {
        return this._profiles
    }

    async loadProfiles() {
        try {
            const response = await ProfileService.fetchAllProfiles();
            await this.setProfiles(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    async createProfile(name, directionId) {
        try {
            const response = await ProfileService.createProfile(name, directionId);
            await this.loadProfiles()
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }

    async updateProfile(id, name, directionId) {
        try {
            const response = await ProfileService.updateProfile(id, name, directionId);
            await this.loadProfiles()
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }

    async deleteProfile(id) {
        try {
            const response = await ProfileService.deleteProfile(id);
            await this.loadProfiles()
            console.log(response)
        } catch (e) {
            console.log(e);
        }
    }
}