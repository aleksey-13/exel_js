export function capitalize(string) {
    if (typeof string !== 'string') {
        return string
    }

    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
    if (start > end) {
        ;[start, end] = [end, start]
    }
    const arr = []

    for (let i = start; i <= end; i++) {
        arr.push(i)
    }

    return arr
}

export function storage(key, data = null) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }

    localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }

    return a === b
}

export function camelCaseToDash(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
}

export function toInlineStyle(styles = {}) {
    return Object.keys(styles)
        .map((key) => `${[camelCaseToDash(key)]}: ${styles[key]}`)
        .join(';')
}

export function debounce(fn, wait) {
    let timeout

    return function (...args) {
        const later = () => {
            clearTimeout(timeout)
            fn.apply(this, args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

export function removeStorage(key) {
    localStorage.removeItem(key)
}

export function preventDefault(event) {
    event.preventDefault()
}
