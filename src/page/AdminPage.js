import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import UserTable from "../component/table/UserTable";
import InstituteTable from "../component/table/InstituteTable";
import DepartmentTable from "../component/table/DepartmentTable";
import DirectionTable from "../component/table/DirectionTable";
import ProfileTable from "../component/table/ProfileTable";

const AdminPage = () => {
    const [tableSelected, setTableSelected] = useState("users")

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container fluid className="ms-3 me-3">
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Button className="m-2" variant="outline-light" onClick={() => setTableSelected("users")}>
                                Пользователи
                            </Button>
                            <Button className="m-2" variant="outline-light" onClick={() => setTableSelected("institutes")}>
                                Институты
                            </Button>
                            <Button className="m-2" variant="outline-light" onClick={() => setTableSelected("departments")}>
                                Кафедры
                            </Button>
                            <Button className="m-2" variant="outline-light" onClick={() => setTableSelected("directions")}>
                                Направления
                            </Button>
                            <Button className="m-2" variant="outline-light" onClick={() => setTableSelected("profiles")}>
                                Профили
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                {tableSelected === "users" && <UserTable />}
                {tableSelected === "institutes" && <InstituteTable/>}
                {tableSelected === "departments" && <DepartmentTable />}
                {tableSelected === "directions" && <DirectionTable />}
                {tableSelected === "profiles" && <ProfileTable />}
            </Container>
        </div>
    );
};

export default observer(AdminPage);