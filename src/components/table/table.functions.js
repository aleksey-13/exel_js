import { range } from '@core/utils'

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function matrix($current, $target) {
    const current = $current.id(true)
    const target = $target.id(true)

    const colIds = range(current.col, target.col)
    const rowIds = range(current.row, target.row)

    return colIds.reduce((acc, curr) => {
        rowIds.forEach((row) => acc.push(`${row}:${curr}`))

        return acc
    }, [])
}

export function nextSelector(key, { col, row }) {
    const MIN_VALUE = 0
    switch (key) {
        case 'ArrowDown':
        case 'Enter':
            row++
            break
        case 'ArrowRight':
        case 'Tab':
            col++
            break
        case 'ArrowUp':
            row = row - 1 < MIN_VALUE ? MIN_VALUE : --row
            break

        case 'ArrowLeft':
            col = col - 1 < MIN_VALUE ? MIN_VALUE : --col
            break
    }

    return `[data-id="${row}:${col}"]`
}
