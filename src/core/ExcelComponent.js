import { DomListener } from './DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter
        this.store = options.store
        this.unsubs = []
        this.subscribe = options.subscribe || []

        this.prepare()
    }

    prepare() {}

    toHTML() {
        // throw new Error('Метод toHTML не реализован')
        return ''
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)

        this.unsubs.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    storeChanged() {}

    isWatching(key) {
        return this.subscribe.includes(key)
    }

    init() {
        this.initDOMListeners()
    }

    destroy() {
        this.removeDOMListeners()

        this.unsubs.forEach((unsub) => unsub())
    }
}
