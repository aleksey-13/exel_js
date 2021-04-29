import { storage } from '@core/utils'

function toHhml({ date, tableName, path }) {
    return `
        <li class="db__record">
            <a href="#excel/${path}">${tableName}</a> 
            <strong>${date}</strong>
        </li>
    `
}

function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)

        if (key.includes('excel')) {
            keys.push(key)
        }
    }

    return keys
}

function dataToHtml(key) {
    const [_, hash] = key.split(':')
    const { tableName, openDate } = storage(key)
    const date =
        new Date(openDate).toLocaleDateString() +
        '/' +
        new Date(openDate).toLocaleTimeString()

    return { date, tableName, path: hash, date }
}

export function createRecordsTable() {
    const keys = getAllKeys()

    if (!keys.length) {
        return '<p>Тут пока ничего нету</p>'
    }

    return `
        <div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
        </div>

        <ul class="db__list">
            ${keys.map(dataToHtml).map(toHhml).join('')}
        </ul>   
    `
}
