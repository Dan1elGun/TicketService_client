import React, {useState} from 'react';
import {Page, View, Text, StyleSheet, Document, Font, Line, Svg} from "@react-pdf/renderer";
import FontCalibriRegular from "../../asset/CalibriRegular.ttf"
import FontCalibriBold from "../../asset/CalibriBold.ttf"

Font.register({
    family: "Calibri",
    fonts: [
        {src: FontCalibriRegular},
        {src: FontCalibriBold, fontWeight: 'bold'},
    ]
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 10,
        paddingHorizontal: 10,
        fontFamily: "Calibri",
        fontSize: 11,
    },
});

const PDFTicketModel = ({data}) => {

    /* Если данные отсутствуют, то используем подставные в качестве заполенния макета */
    if (!data) {
        data = {
            institute: "[Институт]",
            department: "[Кафедра]",
            direction: "00.00.00 [Направление]",
            profile: "[Профиль / Направление]",
            discipline: "[Дисциплина]",
            date: {day: "1", month: "января", year: "2000"},
            protocol: "1",
            firstCategoryQuestions: ["Вопрос_01", "Вопрос_02", "Вопрос_03"],
            secondCategoryQuestions: ["Вопрос_04", "Вопрос_05", "Вопрос_06"],
            thirdCategoryQuestions: ["Вопрос_07", "Вопрос_08", "Вопрос_09"],
        }
    }

    return (
        <Document>
            <Page style={styles.body} wrap>
                {data.firstCategoryQuestions.map((item, index) =>
                    <View wrap={false} key={index}>
                        <Text style={{textAlign: "center"}}>
                            Министерство науки и высшего образования Российской Федерации
                        </Text>
                        <Text style={{textAlign: "center"}}>
                            Федеральное государственное бюджетное образовательное учреждение высшего образования
                        </Text>
                        <Text style={{textAlign: "center", marginBottom: 5}}>
                            «Брянский государственный инженерно-технологический универститет»
                        </Text>
                        <Text style={{textAlign: "center"}}>
                            {data.institute}
                        </Text>
                        <Text style={{textAlign: "center", marginBottom: 5}}>
                            {data.department}
                        </Text>
                        <Text style={{
                            fontSize: 12, textAlign: "center", fontWeight: "bold", marginBottom: 5
                        }}>
                            Билет №{index+1}
                        </Text>
                        <Text>
                            По дисциплине «{data.discipline}»
                        </Text>
                        <Text>
                            Направление {data.direction}
                        </Text>
                        <Text style={{marginBottom: 10}}>
                            Профиль программы «{data.profile}»
                        </Text>
                        <Text style={{marginLeft: 20, marginBottom: 10}}>
                            1.  {item}
                        </Text>
                        {data.secondCategoryQuestions[0] ?
                            <Text style={{marginLeft: 20, marginBottom: 10}}>
                                2.  {data.secondCategoryQuestions[index]}
                            </Text>
                            : ''
                        }
                        {data.thirdCategoryQuestions[0] ?
                            <Text style={{marginLeft: 20, marginBottom: 10}}>
                                3.  {data.thirdCategoryQuestions[index]}
                            </Text>
                            : ''
                        }
                        <Text>Утверждено на заседанни кафедры «{data.date.day}» {data.date.month} {data.date.year} года, протокол №{data.protocol}</Text>
                        <Text style={{marginLeft: 20, marginTop: 15, marginBottom: 5}}>Заведующий кафедрой</Text>
                        <Svg style={{marginBottom: 10}} height="1" width="575"><Line x1="0" y1="0" x2="575" y2="0" strokeWidth={1} stroke="rgb(0,0,0)" /></Svg>
                    </View>
                )}
            </Page>
        </Document>
    )
};

export default PDFTicketModel