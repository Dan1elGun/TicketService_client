import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Container, Form, Nav} from "react-bootstrap";
import {Context} from "../index";
import TicketDataService from "../service/TicketDataService";
import TicketModel from "../component/PDFGenerationModel/TicketModel";
import {PDFViewer} from '@react-pdf/renderer';

const TicketGeneratorPage = () => {
    const {instituteStore} = useContext(Context)
    const {departmentStore} = useContext(Context)
    const {directionStore} = useContext(Context)
    const {profileStore} = useContext(Context)

    /* Загружаем данные в локальное хранилище */
    useEffect(() => {
        instituteStore.loadInstitutes()
        departmentStore.loadDepartments()
        directionStore.loadDrirections()
        profileStore.loadProfiles()
    }, [instituteStore, departmentStore, directionStore, profileStore])

    /* Переменные которые используются во время фильтрации данных */
    const [graduation, setGraduation] = useState('')
    const [instituteIdSelected, setInstituteIdSelected] = useState('')
    const [directionIdSelected, setDirectionIdSelected] = useState('')
    const [directionConsiderInstitute, setDirectionConsiderInstitute] = useState(true)
    const [departmentConsiderInstitute, setDepartmentConsiderInstitute] = useState(true)
    const [profileConsiderDirection, setProfileConsiderDirection] = useState(true)
    const [firstCategoryHide, setFirstCategoryHide] = useState(true)
    const [secondCategoryHide, setSecondCategoryHide] = useState(true)
    const [thirdCategoryHide, setThirdCategoryHide] = useState(true)
    const [hideToolBar, setHideToolbar] = useState(true)

    /* Данные извлекаемые из формы */
    const [instituteSelected, setInstituteSelected] = useState('')
    const [departmentSelected, setDepartmentSelected] = useState('')
    const [directionSelected, setDirectionSelected] = useState('')
    const [profileSelected, setProfileSelected] = useState('')
    const [disciplineSelected, setDisciplineSelected] = useState('')
    const [dateSelected, setDateSelected] = useState('')
    const [protocolSelected, setProtocolSelected] = useState('')
    const [firstCategoryFile, setFirstCategoryFile] = useState('')
    const [secondCategoryFile, setSecondCategoryFile] = useState('')
    const [thirdCategoryFile, setThirdCategoryFile] = useState('')
    const [ticketsNum, setTicketsNum] = useState('')

    /* Данные из формы упакованные в общий объект */
    const [formData, setFormData] = useState('')

    const generateTicket = async () => {
        let access = true

        /* Простая валидация на заполнение всех полей */
        if (!instituteSelected) {access = false;}
        if (!departmentSelected) {access = false;}
        if (!directionSelected) {access = false;}
        if (!disciplineSelected) {access = false;}
        if (!dateSelected) {access = false;}
        if (!protocolSelected) {access = false;}
        if (firstCategoryHide && secondCategoryHide && thirdCategoryHide) {
            access = false;
        } else if ((!firstCategoryHide && !firstCategoryFile)) {
            access = false;
        } else if ((!secondCategoryHide && !secondCategoryFile)) {
            access = false;
        } else if ((!thirdCategoryHide && !thirdCategoryFile)) {
            access = false;
        }
        if (!ticketsNum) {access = false;}

        /* Если валидация пройдена, то упаковываем данные в объект для дальнейшей его передачи в модель генерации билетов*/
        if(access) {
            setFormData({
                institute: instituteSelected,
                department: departmentSelected,
                direction: directionSelected,
                profile: (!profileSelected ? directionSelected.split(' ').pop() : profileSelected),
                discipline: disciplineSelected,
                date: TicketDataService.dateToRus(dateSelected),
                protocol: protocolSelected,
                firstCategoryQuestions: ((!firstCategoryHide && firstCategoryFile) ?
                    (await TicketDataService.generateQuestions(firstCategoryFile, ticketsNum)) : []),
                secondCategoryQuestions: ((!secondCategoryHide && secondCategoryFile) ?
                    (await TicketDataService.generateQuestions(secondCategoryFile, ticketsNum)) : []),
                thirdCategoryQuestions: ((!thirdCategoryHide && thirdCategoryFile) ?
                    (await TicketDataService.generateQuestions(thirdCategoryFile, ticketsNum)) : []),
            })
            /* После генерации билетов показываем верхнюю панель pdf документа */
            setHideToolbar(false)
        } else {
            alert("Заполните все поля!")
        }
    }

    return (
        <div>
            <Nav>
                <Container style={{maxWidth: "46em", maxHeight: "41em", overflowY: "scroll"}} className="m-3 p-3 shadow-lg bg-body rounded-2">
                    <Form>

                        <Form.Group className="mb-3">
                            <Form.Label>Институт</Form.Label>
                            <Form.Select onChange={e => {
                                setInstituteSelected(e.target.value)
                                setInstituteIdSelected((e.target.childNodes[e.target.selectedIndex]).getAttribute('id'))
                            }}>
                                <option value={""}>. . .</option>
                                {instituteStore.institutes.map((item) =>
                                    <option key={item.id} id={item.id} value={item.name}>{item.name}</option>
                                )}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Кафедра</Form.Label>
                            <Form.Check label="Относится к институту" type={"checkbox"} checked={departmentConsiderInstitute}
                                        onChange={() => {setDepartmentConsiderInstitute(!departmentConsiderInstitute)}}/>
                            <Form.Select  onChange={e => {setDepartmentSelected(e.target.value)}}>
                                <option value={""}>. . .</option>
                                {departmentStore.departments.map((item) => {
                                    if (departmentConsiderInstitute && !(item.instituteId == instituteIdSelected)) {return ''}
                                    return <option key={item.id} value={item.name}>{item.name}</option>
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Направление</Form.Label>
                            <Form.Check label="Относится к институту" type={"checkbox"} checked={directionConsiderInstitute}
                                        onChange={() => {setDirectionConsiderInstitute(!directionConsiderInstitute)}}/>
                            <Form.Group>
                                <Form.Check inline label="Бакалавриат" name="graduation" type={"radio"} value={'3'}
                                    onChange={e => setGraduation(e.target.value)}
                                />
                                <Form.Check inline label="Магистратура" name="graduation" type={"radio"} value={'4'}
                                    onChange={e => setGraduation(e.target.value)}
                                />
                                <Form.Check inline label="Специалитет" name="graduation" type={"radio"} value={'5'}
                                    onChange={e => setGraduation(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Select  onChange={e => {
                                setDirectionSelected(e.target.value)
                                setDirectionIdSelected((e.target.childNodes[e.target.selectedIndex]).getAttribute('id'))
                            }}>
                                <option value={""}>. . .</option>
                                {directionStore.directions.map((item) => {
                                    if (graduation && !((item.code)[4] === graduation)) {return ''}
                                    if (directionConsiderInstitute && !(item.instituteId == instituteIdSelected)) {return ''}
                                    return <option key={item.id} id={item.id} value={(item.code + ' ' + item.name)}>{(item.code + ' ' + item.name)}</option>
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Профиль (Необязательное поле)</Form.Label>
                            <Form.Check label="Относится к направлению" type={"checkbox"} checked={profileConsiderDirection}
                                        onChange={() => {setProfileConsiderDirection(!profileConsiderDirection)}}/>
                            <Form.Select  onChange={e => setProfileSelected(e.target.value)}>
                                <option value={""}>. . .</option>
                                {profileStore.profiles.map((item) => {
                                    if (profileConsiderDirection && !(item.directionId == directionIdSelected)) {return ''}
                                    return <option key={item.id} value={item.name}>{item.name}</option>
                                })}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Дисциплина</Form.Label>
                            <Form.Control className="mb-3" placeholder={"Введите название дисциплины"}
                                          onChange={e => setDisciplineSelected(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Дата утверждения</Form.Label>
                            <Form.Control type="date"
                                onChange={e => setDateSelected(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Номер протокола</Form.Label>
                            <Form.Control type="number" min={1} max={1000}
                                onChange={e => setProtocolSelected(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Количество категорий вопросов</Form.Label>
                            <Form.Group>
                                <Form.Check inline label="1" name="category" type={"radio"}
                                            onChange={() => {
                                                setFirstCategoryHide(false)
                                                setSecondCategoryHide(true)
                                                setThirdCategoryHide(true)
                                            }}
                                />
                                <Form.Check inline label="2" name="category" type={"radio"}
                                            onChange={() => {
                                                setFirstCategoryHide(false)
                                                setSecondCategoryHide(false)
                                                setThirdCategoryHide(true)
                                            }}
                                />
                                <Form.Check inline label="3" name="category" type={"radio"}
                                            onChange={() => {
                                                setFirstCategoryHide(false)
                                                setSecondCategoryHide(false)
                                                setThirdCategoryHide(false)
                                            }}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label hidden={firstCategoryHide}>Вопросы первой категории. Файл CSV (Разделители запятые) [Все вопросы в один столбец].</Form.Label>
                                <Form.Control type="file" accept=".csv" hidden={firstCategoryHide}
                                    onChange={e => setFirstCategoryFile(e.target.files[0])}
                                />
                                <Form.Label hidden={secondCategoryHide}>Вопросы второй категории. Файл CSV (Разделители запятые) [Все вопросы в один столбец].</Form.Label>
                                <Form.Control type="file" accept=".csv" hidden={secondCategoryHide}
                                    onChange={e => setSecondCategoryFile(e.target.files[0])}
                                />
                                <Form.Label hidden={thirdCategoryHide}>Вопросы третьей категории. Файл CSV (Разделители запятые) [Все вопросы в один столбец].</Form.Label>
                                <Form.Control type="file" accept=".csv" hidden={thirdCategoryHide}
                                    onChange={e => setThirdCategoryFile(e.target.files[0])}
                                />
                            </Form.Group>
                        </Form.Group>

                        <Form.Group className="mt-3">
                            <Form.Label>Количество билетов</Form.Label>
                            <Form.Control type="number" min={1} max={200}
                                onChange={e => setTicketsNum(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Button className="mt-3" variant="outline-success" onClick={generateTicket}>Сгенерировать билеты</Button>
                        </Form.Group>

                    </Form>
                </Container>

                <Container style={{maxWidth: "45em"}} className="m-3">
                    <PDFViewer width={470} height={650} showToolbar={!hideToolBar}>
                        <TicketModel data={formData}/>
                    </PDFViewer>
                </Container>
            </Nav>
        </div>
    );
};

export default observer(TicketGeneratorPage);