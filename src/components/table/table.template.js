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
    const rows = []

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount).fill('').map(createCel(row)).join('')

        rows.push(createRow(row + 1, cells))
    }

    return rows.join(' ')
}

function createCol(colName, index) {
    return `
        <div 
            class="column" 
            data-type="resizable" 
            data-col="${index}">
            ${colName}
            <span class="col-resize" data-resize="col"></span>
        </div>`
}

function createCel(row) {
    return function c(cellData, col) {
        return `<div
            class="cell"
            contenteditable
            data-col="${col}"
            data-id="${col + 1}:${row + 1}">
            ${cellData}
        </div>`
    }
}

function createRow(index, data) {
    const resize = index
        ? '<span class="row-resize" data-resize="row"></span>'
        : ''

    const isResizable = index ? 'data-type="resizable"' : ''

    return `
      <div class="row" ${isResizable}>
        <div class="row-info">${resize}${index || ''}</div>
        <div class="row-data">${data}</div>
      </div>
    `
}
