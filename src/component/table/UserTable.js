import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Container, Table} from "react-bootstrap";
import {Context} from "../../index";


const UserTable = () => {
    const {userStore} = useContext(Context)

    useEffect(() => {
        userStore.loadUsers()
    }, [userStore])

    return (
        <div>
            <Container className="crud shadow-lg p-3 mt-3 bg-body rounded">
                <h5 className="text-center">Пользователи</h5>
                <Container style={{overflowY: "scroll", maxHeight: "30em"}}>
                    <Table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Роль (права доступа)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userStore.users.map((item) =>
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Container>
            </Container>
        </div>
    );
};

export default observer(UserTable);