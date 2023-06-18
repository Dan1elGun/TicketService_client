import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {adminRoutes, userRoutes, publicRoutes, LOGIN_ROUTE, TICKET_GENERATOR_ROUTE} from "../router/index";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = () => {
    const {authStore} = useContext(Context)

    return (
        <Routes>
            {authStore.isAuth && (authStore.user.role === 'ADMIN') && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {authStore.isAuth && userRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {!localStorage.getItem('token') && <Route path='*' element={<Navigate to={LOGIN_ROUTE}/>} />}
            {authStore.isAuth && <Route path='*' element={<Navigate to={TICKET_GENERATOR_ROUTE}/>} />}
        </Routes>
    );
};

export default observer(AppRouter);