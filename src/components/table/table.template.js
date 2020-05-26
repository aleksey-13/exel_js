const CODES = {
    A: 65,
    Z: 90
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    rows.push(createTableHeader(colsCount))
    rows.push(crateTableBody(rowsCount, colsCount))

    return rows.join(' ')
}

function createCharFromCharCode(_, code) {
    return String.fromCharCode(CODES.A + code)
}

function createTableHeader(colsCount) {
    const cols = new Array(colsCount)
        .fill('')
        .map(createCharFromCharCode)
        .map(createCol)
        .join('')

    return createRow(null, cols)
}

function crateTableBody(rowsCount, colsCount) {
    const cols = new Array(colsCount).fill('').map(createCel).join('')
    const rows = new Array(rowsCount)
        .fill(cols)
        .map((cols, idx) => createRow(idx + 1, cols))
        .join('')

    return rows
}

function createCol(colName) {
    return `<div class="column">${colName}</div>`
}

function createCel(celData) {
    return `<div class="cell" contenteditable>${celData}</div>`
}

function createRow(index, data) {
    return `
      <div class="row">
        <div class="row-info">${index || ''}</div>
        <div class="row-data">${data}</div>
      </div>
    `
}
