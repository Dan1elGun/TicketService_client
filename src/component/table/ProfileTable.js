import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, Table} from "react-bootstrap";
import {Context} from "../../index";
import ProfileModal from "../modal/ProfileModal";


const ProfileTable = () => {
    const {profileStore} = useContext(Context)
    const {directionStore} = useContext(Context)
    const [profileModalVisible, setProfileModalVisible] = useState(false)
    const [profile, setProfile] = useState('')

    useEffect(() => {
        profileStore.loadProfiles()
        directionStore.loadDrirections()
    }, [profileStore, directionStore])

    return (
        <div>
            <Container className="crud shadow-lg p-3 mt-3 bg-body rounded">
                <h5 className="text-center">Профили</h5>
                <Button className="m-2" onClick={() => setProfileModalVisible(true)}>Добавить профиль</Button>
                <Container style={{overflowY: "scroll", maxHeight: "30em"}}>
                    <Table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Название</th>
                            <th>Относится к направлению</th>
                            <th>Редакт.</th>
                            <th>Удалить</th>
                        </tr>
                        </thead>
                        <tbody>
                        {profileStore.profiles.map((item) =>
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>
                                    {directionStore.directions.map((i) =>  {
                                        if (i.id === item.directionId) {return i.code + ' ' + i.name} else {return ''}
                                    })}
                                </td>

                                <td>
                                    <Button variant={"primary"} onClick={() => {setProfile(item); setProfileModalVisible(true)}}>
                                        &#10000;
                                    </Button>
                                </td>

                                <td>
                                    <Button variant={"danger"} onClick={() => profileStore.deleteProfile(item.id)}>&#10006;</Button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Container>
                <ProfileModal show={profileModalVisible} onHide={() => {setProfileModalVisible(false); setProfile('')}} profile={profile} />
            </Container>
        </div>
    );
};

export default observer(ProfileTable);