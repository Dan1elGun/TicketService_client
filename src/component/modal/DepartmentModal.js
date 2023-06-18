import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const DepartmentModal = ({show, onHide, department}) => {
    const {departmentStore} = useContext(Context)
    const {instituteStore} = useContext(Context)
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [instituteId, setInstituteId] = useState(0)

    useEffect(() => {
        if (department) {
            setId(department.id)
            setName(department.name)
            setInstituteId(department.instituteId)
        }
    }, [department])

    const editDepartment = () => {
        if (department) {
            departmentStore.updateDepartment(id, name, instituteId)
        } else {
            departmentStore.createDepartment(name, instituteId)
        }
        setId(0)
        setName('')
        setInstituteId(0)
        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {department ? "Редактировать" : "Добавить"} кафедру
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Название</Form.Label>
                        <Form.Control className="mb-3"
                                      value={name}
                                      onChange={e => setName(e.target.value)}
                                      placeholder={"Введите название нарпавления"}
                        />
                        <Form.Label>Относится к институту</Form.Label>
                        <Form.Select  onChange={e => setInstituteId(e.target.value)}>
                            <option value={instituteId}>
                                {instituteStore.institutes.map((item) =>  {
                                    if (item.id === instituteId) {return item.name} else {return ''}
                                })}
                            </option>
                            {instituteStore.institutes.map((item) =>
                                <option key={item.id} value={item.id}>{item.name}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={editDepartment}>{department ? "Сохранить" : "Добавить"}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default observer(DepartmentModal);