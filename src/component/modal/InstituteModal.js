import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const InstituteModal = ({show, onHide, institute}) => {
    const {instituteStore} = useContext(Context)
    const [id, setId] = useState(0)
    const [name, setName] = useState('')

    useEffect(() => {
        if (institute) {
            setId(institute.id)
            setName(institute.name)
        }
    }, [institute])

    const editInstitute = () => {
        if (institute) {
            instituteStore.updateInstitute(id, name)
        } else {
            instituteStore.createInstitute(name)
        }
        setId(0)
        setName('')
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
                    {institute ? "Редактировать" : "Добавить"} институт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Название</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder={"Введите название института"}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={editInstitute}>{institute ? "Сохранить" : "Добавить"}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default observer(InstituteModal);