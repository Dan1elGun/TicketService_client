import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, Table} from "react-bootstrap";
import {Context} from "../../index";
import InstituteModal from "../modal/InstituteModal";


const InstituteTable = () => {
    const {instituteStore} = useContext(Context)
    const [instituteModalVisible, setInstituteModalVisible] = useState(false)
    const [institute, setInstitute] = useState('')

    useEffect(() => {
        instituteStore.loadInstitutes()
    }, [instituteStore])

    return (
        <div>
            <Container className="crud shadow-lg p-3 mt-3 bg-body rounded">
                <h5 className="text-center">Институты</h5>
                <Button className="m-2" onClick={() => setInstituteModalVisible(true)}>Добавить институт</Button>
                <Container style={{overflowY: "scroll", maxHeight: "30em"}}>
                    <Table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Название</th>
                            <th>Редакт.</th>
                            <th>Удалить</th>
                        </tr>
                        </thead>
                        <tbody>
                        {instituteStore.institutes.map((item) =>
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <Button variant={"primary"} onClick={() => {setInstitute(item);setInstituteModalVisible(true)}}>
                                        &#10000;
                                    </Button>
                                </td>
                                <td>
                                    <Button variant={"danger"} onClick={() => instituteStore.deleteInstitute(item.id)}>&#10006;</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Container>
                <InstituteModal show={instituteModalVisible} onHide={() => {setInstituteModalVisible(false); setInstitute('')}} institute={institute} />
            </Container>
        </div>
    );
};

export default observer(InstituteTable);