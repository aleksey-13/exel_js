import { $ } from '@core/dom'
import { Emiter } from '@core/Emiter'

export class Excel {
    constructor(selector, options) {
        const { components = [] } = options

        this.$el = $(selector)
        this.components = components
        this.emiter = new Emiter()
    }

    getRoot() {
        const $root = $.create('div', 'excel')

        const componentOptions = { emiter: this.emiter }

        this.components = this.components.map((Component) => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            $el.html(component.toHTML())
            $root.append($el)

            return component
        })

        return $root
    }

    render() {
        this.$el.append(this.getRoot())

        this.components.forEach((component) => component.init())
    }

    remove() {
        this.components.forEach((component) => component.destroy())
    }

    destroy() {
        this.components.forEach((component) => component.destroy())
    }
}
