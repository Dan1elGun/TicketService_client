import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Form, Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const ProfileModal = ({show, onHide, profile}) => {
    const {profileStore} = useContext(Context)
    const {directionStore} = useContext(Context)
    const [id, setId] = useState(0)
    const [name, setName] = useState('')
    const [directionId, setDirectionId] = useState(0)

    useEffect(() => {
        if (profile) {
            setId(profile.id)
            setName(profile.name)
            setDirectionId(profile.directionId)
        }
    }, [profile])

    const editProfile = () => {
        if (profile) {
            profileStore.updateProfile(id, name, directionId)
        } else {
            profileStore.createProfile(name, directionId)
        }
        setId(0)
        setName('')
        setDirectionId(0)
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
                    {profile ? "Редактировать" : "Добавить"} профиль
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Название</Form.Label>
                        <Form.Control className="mb-3"
                                      value={name}
                                      onChange={e => setName(e.target.value)}
                                      placeholder={"Введите название профилья"}
                        />
                        <Form.Label>Относится к направлению</Form.Label>
                        <Form.Select  onChange={e => setDirectionId(e.target.value)}>
                            <option value={directionId}>
                                {directionStore.directions.map((item) =>  {
                                    if (item.id === directionId) {return item.name} else {return ''}
                                })}
                            </option>
                            {directionStore.directions.map((item) =>
                                <option key={item.id} value={item.id}>{item.code + ' ' + item.name}</option>
                            )}
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={editProfile}>{profile ? "Сохранить" : "Добавить"}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default observer(ProfileModal);