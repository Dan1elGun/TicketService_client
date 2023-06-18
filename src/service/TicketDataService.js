import Papa from 'papaparse'

export default class TicketDataService {
    static dateToRus(date) {
        let day = (date[8] === "0") ? date[9] : date.substring(8,10)
        let month = ''
        let year = date.substring(0,4)
        switch(date.substring(5,7)) {
            case "01" :
                month = "января"
                break
            case "02" :
                month = "февраля"
                break
            case "03" :
                month = "марта"
                break
            case "04" :
                month = "апреля"
                break
            case "05" :
                month = "мая"
                break
            case "06" :
                month = "июня"
                break
            case "07" :
                month = "июля"
                break
            case "08" :
                month = "августа"
                break
            case "09" :
                month = "сентября"
                break
            case "10" :
                month = "октября"
                break
            case "11" :
                month = "ноября"
                break
            case "12" :
                month = "декабря"
                break
            default:
                month = false
        }
        return {day: day, month: month, year: year}
    }

    static async parseCSV(importFile) {
        return await new Promise((resolve, reject) => {
            Papa.parse(importFile, {
                encoding: "cp1251",
                delimiter: ",",
                complete: ((result) => {
                    resolve(result.data)
                }),
                error: ((error) => {
                    reject(error)
                })
            })
        })
    }

    static async generateQuestions(file, ticketsNum) {
        let buffer = await TicketDataService.parseCSV(file) // буфер загруженых вопросов
        let questions = [] // результативный массив

        for(let i = 0; i < ticketsNum; i++) {
            /* Пока в буфере остаются вопросы, они извлекаются в случайном порядке.
            *  Когда вопросов в буфере не останется, они будут копироваться в результативном массиве в случайном порядке.
            */
            if (buffer[0][0]) {
                let randomIndex = Math.floor(Math.random() * (buffer.length-2));
                questions.push(buffer[randomIndex][0])
                buffer.splice(randomIndex, 1)
            } else {
                let randomIndex = Math.floor(Math.random() * (questions.length-1));
                questions.push(questions[randomIndex])
            }
        }
        return questions
    }
}