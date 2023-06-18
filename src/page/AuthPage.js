import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Container, Form, Nav} from "react-bootstrap";
import {useLocation, useNavigate, NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, TICKET_GENERATOR_ROUTE} from "../router";
import {Context} from "../index";

const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = (location.pathname === LOGIN_ROUTE);
    const {authStore} = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const auth = async () => {
        if (email && password) {
            if (isLogin) {
                await authStore.login(email, password);
                navigate(TICKET_GENERATOR_ROUTE)
            } else {
                await authStore.registration(email, password);
                alert("На вашу почту была отправлена ссылка подтверждения. " +
                    "Пожалуйста откройте вашу почту и перейдите по ссылке для подтверждения аккаунта")
            }
        } else {
            setError("Заполните все поля")
        }
    }

    return (
        <div>
            <Container style={{width: "30%", marginTop: "10%"}}>
                <Card className="p-4">
                    <h3 className="text-center">{isLogin ? 'Авторизация' : "Регистрация"}</h3>
                    <Form>

                        <Form.Group className="mb-3">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Введите email" value={email}
                            onChange={e => setEmail(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Введите пароль" value={password}
                            onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>

                        <div className="text-center mb-2">{error}</div>

                        <Form.Group>
                            <Nav>
                                {isLogin ?
                                    <div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрироваться</NavLink>.</div>
                                    :
                                    <div>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>.</div>
                                }
                                <Button variant="outline-success" className="ms-auto" onClick={auth}>
                                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                                </Button>
                            </Nav>
                        </Form.Group>

                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default observer(AuthPage);