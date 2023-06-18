import {makeAutoObservable} from "mobx";
import UserService from "../service/UserService";

export default class UserStore {
    constructor() {
        this._users = [];
        makeAutoObservable(this)
    }

    setUsers(users) {
        this._users = users
    }

    get users() {
        return this._users
    }

    async loadUsers() {
        try {
            const response = await UserService.fetchAllUsers();
            await this.setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }
}