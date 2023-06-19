import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthStore from "./store/AuthStore";
import UserStore from "./store/UserStore";
import InstituteStore from "./store/InstituteStore";
import DepartmentStore from "./store/DepartmentStore";
import DirectionStore from "./store/DirectionStore";
import ProfileStore from "./store/ProfileStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        authStore: new AuthStore(),
        userStore: new UserStore(),
        instituteStore: new InstituteStore(),
        departmentStore: new DepartmentStore(),
        directionStore: new DirectionStore(),
        profileStore: new ProfileStore(),
    }}>
        <App />
    </Context.Provider>,
);