import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, Table} from "react-bootstrap";
import {Context} from "../../index";
import DirectionModal from "../modal/DirectionModal";


const DirectionTable = () => {
    const {directionStore} = useContext(Context)
    const {instituteStore} = useContext(Context)
    const [directionModalVisible, setDirectionModalVisible] = useState(false)
    const [direction, setDirection] = useState('')

    useEffect(() => {
        directionStore.loadDrirections()
        instituteStore.loadInstitutes()
    }, [directionStore, instituteStore])

    return (
        <div>
            <Container className="crud shadow-lg p-3 mt-3 bg-body rounded">
                <h5 className="text-center">Направления</h5>
                <Button className="m-2" onClick={() => setDirectionModalVisible(true)}>Добавить направление</Button>
                <Container style={{overflowY: "scroll", maxHeight: "30em"}}>
                    <Table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Код</th>
                            <th>Название</th>
                            <th>Относится к институту</th>
                            <th>Редакт.</th>
                            <th>Удалить</th>
                        </tr>
                        </thead>
                        <tbody>
                        {directionStore.directions.map((item) =>
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>
                                    {instituteStore.institutes.map((i) =>  {
                                        if (i.id === item.instituteId) {return i.name} else {return ''}
                                    })}
                                </td>
                                <td>
                                    <Button
                                        variant={"primary"}
                                        onClick={() => {setDirection(item); setDirectionModalVisible(true)}}
                                    >
                                        &#10000;
                                    </Button>
                                </td>
                                <td>
                                    <Button variant={"danger"} onClick={() => directionStore.deleteDirection(item.id)}>&#10006;</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Container>
                <DirectionModal show={directionModalVisible} onHide={() => {setDirectionModalVisible(false); setDirection('')}} direction={direction} />
            </Container>
        </div>
    );
};

export default observer(DirectionTable);