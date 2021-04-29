import { toInlineStyle } from '@core/utils'
import { defaultStyles } from '@/constans'
import { parse } from '@core/parse'
const CODES = {
    A: 65,
    Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function toCell(row, state) {
    let width, key, text
    return (_, col) => {
        width = getWidth(state.colState, col)
        key = `${row}:${col}`
        text = getText(state, key)

        const styles = toInlineStyle(state.stylesState[key] || defaultStyles)

        return `
            <div 
                class="cell" 
                contenteditable  
                data-col="${col}" 
                data-id ="${key}"
                data-type="cell"
                data-value="${text}"
                style="width:${width};${styles}">
                ${parse(text)}
            </div>`
    }
}

function toCol({ data, index, width }) {
    return `
        <div class="column" data-type="resizable" data-col="${index}" style="width: ${width}">
            <span class="col-resize" data-resize="col"></span>
            ${data}
        </div>
    `
}

function toRow(col = '', index = '', height) {
    const resize = index
        ? `<span class="row-resize" data-resize="row"></span>`
        : ''

    const isResizable = index ? 'data-type="resizable"' : ''

    const isDataRow = index ? `data-row="${index}"` : ''
    return `
        <div class="row" ${isResizable} ${isDataRow} style="height:${height}">
            <div class="row-info">${resize}${index}</div>
            <div class="row-data">${col}</div>
        </div>
    `
}

function toChar(_, idx) {
    return String.fromCharCode(CODES.A + idx)
}

function getWidth(state, idx) {
    return (state[idx] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, idx) {
    return (state[idx] || DEFAULT_HEIGHT) + 'px'
}

function getText(state, key) {
    return state.dataState[key] || ''
}

function withWidthFrom(state) {
    return (data, index) => {
        const width = getWidth(state, index)

        return { data, index, width }
    }
}

export function createTable(rowsCount, state = {}) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const headerCols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(withWidthFrom(state.colState))
        .map(toCol)
        .join('')

    rows.push(toRow(headerCols))

    for (let i = 0; i < rowsCount; i++) {
        const cols = new Array(colsCount)
            .fill('')
            .map(toCell(i, state))
            .join('')

        rows.push(toRow(cols, i + 1, getHeight(state.rowState, i + 1)))
    }

    return rows.join('')
}
