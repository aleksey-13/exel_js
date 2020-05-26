import { DomListener } from '@core/DOMListener'

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        const { listeners, name = '' } = options

        super($root, listeners)

        this.name = name
    }

    toHTML() {
        return ''
    }

    init() {
        this.initDOMListeners()
    }

    destroy() {
        this.removeDOMListeners()
    }
}
