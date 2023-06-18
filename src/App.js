import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import AppRouter from "./component/AppRouter";
import NavBar from "./component/NavBar";
import {BrowserRouter} from "react-router-dom";
import {Context} from "./index";

const App = () => {
    const {authStore} = useContext(Context);

    /* Прокидываем проверку авторизации при наличии токена */
    useEffect( () => {
        if (localStorage.getItem('token')) {
            authStore.checkAuth()
        }
    }, [authStore])

    /* Показываем колесо загрузки пока проверяются данные пользователя */
    if (authStore.isLoading) {
        return <div>Загрузка...</div>
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
        </BrowserRouter>
    );
};

export default observer(App);