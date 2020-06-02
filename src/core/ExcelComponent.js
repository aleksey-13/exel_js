import { DomListener } from '@core/DOMListener'

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        const { listeners, name = '', emiter } = options

        super($root, listeners)

        this.name = name
        this.emiter = emiter
        this.onsubsctibers = []

        this.prepare()
    }

    prepare() {}

    toHTML() {
        return ''
    }

    $emit(event, ...args) {
        this.emiter.emit(event, ...args)
    }

    $on(event, fn) {
        const unsub = this.emiter.subscribe(event, fn)
        this.onsubsctibers.push(unsub)
    }

    init() {
        this.initDOMListeners()
    }

    destroy() {
        this.removeDOMListeners()
        this.onsubsctibers.forEach((unsub) => unsub())
    }
}
