import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, Table} from "react-bootstrap";
import {Context} from "../../index";
import DepartmentModal from "../modal/DepartmentModal";


const DepartmentTable = () => {
    const {departmentStore} = useContext(Context)
    const {instituteStore} = useContext(Context)
    const [departmentModalVisible, setDepartmentModalVisible] = useState(false)
    const [department, setDepartment] = useState('')

    useEffect(() => {
        departmentStore.loadDepartments()
        instituteStore.loadInstitutes()
    }, [departmentStore, instituteStore])

    return (
        <div>
            <Container className="crud shadow-lg p-3 mt-3 bg-body rounded">
                <h5 className="text-center">Кафедры</h5>
                <Button className="m-2" onClick={() => setDepartmentModalVisible(true)}>Добавить кафедру</Button>
                <Container style={{overflowY: "scroll", maxHeight: "30em"}}>
                    <Table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Название</th>
                            <th>Относится к институту</th>
                            <th>Редакт.</th>
                            <th>Удалить</th>
                        </tr>
                        </thead>
                        <tbody>
                        {departmentStore.departments.map((item) =>
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    {instituteStore.institutes.map((i) =>  {
                                        if (i.id === item.instituteId) {return i.name} else {return ''}
                                    })}
                                </td>
                                <td>
                                    <Button
                                        variant={"primary"}
                                        onClick={() => {setDepartment(item); setDepartmentModalVisible(true)}}
                                    >
                                        &#10000;
                                    </Button>
                                </td>
                                <td>
                                    <Button variant={"danger"} onClick={() => departmentStore.deleteDepartment(item.id)}>&#10006;</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Container>
                <DepartmentModal show={departmentModalVisible} onHide={() => {setDepartmentModalVisible(false); setDepartment('')}} department={department} />
            </Container>
        </div>
    );
};

export default observer(DepartmentTable);