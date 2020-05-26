import { capitalize } from '@core/utils'

export class DomListener {
    constructor($root, listenets = []) {
        if (!$root) {
            throw new Error(`No ${$root} proveded for DomListener`)
        }

        this.$root = $root
        this.listeners = listenets
    }

    initDOMListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener)

            if (!this[method]) {
                throw new Error(
                    `Method ${method} is not implemented in 
                    ${this.name} Component`
                )
            }
            this[method] = this[method].bind(this)

            this.$root.on(listener, this[method])
        })
    }

    removeDOMListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(eventName) {
    return `on${capitalize(eventName)}`
}
