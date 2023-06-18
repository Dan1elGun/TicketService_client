import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const DirectionModal = ({show, onHide, direction}) => {
    const {directionStore} = useContext(Context)
    const {instituteStore} = useContext(Context)
    const [id, setId] = useState(0)
    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [instituteId, setInstituteId] = useState(0)

    useEffect(() => {
        if (direction) {
            setId(direction.id)
            setCode(direction.code)
            setName(direction.name)
            setInstituteId(direction.instituteId)
        }
    }, [direction])

    const editDirection = () => {
        const regEx = /\d\d\.\d\d\.\d\d/;
        if (!code.match(regEx)) {
            alert('Неверный формат кода направления. Пример: 00.00.00')
        } else {
            if (direction) {
                directionStore.updateDirection(id, code, name, instituteId)
            } else {
                directionStore.createDirection(code, name, instituteId)
            }
            setId(0)
            setCode('')
            setName('')
            setInstituteId(0)
            onHide()
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {direction ? "Редактировать" : "Добавить"} направление
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Код ( Формат: 00.00.00 )</Form.Label>
                        <Form.Control className="mb-3"
                                      value={code}
                                      onChange={e => setCode(e.target.value)}
                                      placeholder={"00.00.00"}
                        />
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
                <Button variant="outline-success" onClick={editDirection}>{direction ? "Сохранить" : "Добавить"}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default observer(DirectionModal);