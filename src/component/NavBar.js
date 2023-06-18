import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {adminRoutes, LOGIN_ROUTE, publicRoutes, userRoutes} from "../router";
import {Context} from "../index";

const NavBar = () => {
    const navigate = useNavigate()
    const {authStore} = useContext(Context)

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid className="ms-5 me-5">
                    <Navbar.Brand href="*">TicketService</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            {authStore.isAuth && (authStore.user.role === 'ADMIN') && adminRoutes.map(({path, label}) =>
                                <Nav.Link key={path} onClick={() => navigate(path)}>{label}</Nav.Link>
                            )}
                            {authStore.isAuth && userRoutes.map(({path, label}) =>
                                <Nav.Link key={path} onClick={() => navigate(path)}>{label}</Nav.Link>
                            )}
                        </Nav>
                        <Nav>
                            {authStore.isAuth ?
                                <Button variant="dark" onClick={() => {authStore.logout(); navigate(LOGIN_ROUTE)}}>Выход</Button>
                                :
                                publicRoutes.map(({path, label}) =>
                                    <Button variant="dark" key={path} onClick={() => navigate(path)}>{label}</Button>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default observer(NavBar);