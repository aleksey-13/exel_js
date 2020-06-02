import { range } from '@core/utils'

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function shouldSelected(event) {
    return event.target.dataset.id
}

export function matrix($target, $current) {
    const target = $target.id(true)
    const current = $current.id(true)
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)

    return cols.reduce((acc, col) => {
        rows.forEach((row) => acc.push(`${col}:${row}`))
        return acc
    }, [])
}

export function nextSelector(keyCode, $current) {
    const current = $current.id(true)
    const next = { ...current }

    switch (keyCode) {
        case 9:
        case 39:
            next.col = current.col + 1
            break
        case 13:
        case 40:
            next.row = current.row + 1
            break
        case 37:
            next.col = current.col - 1
            break
        case 38:
            next.row = current.row - 1
            break
    }

    return `[data-id="${next.col}:${next.row}"]`
}
