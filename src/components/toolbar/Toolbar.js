import { ExcelStateComponent } from '@core/ExcelStateComponent'
import { $ } from '@core/dom'
import { createToolbar } from './toolbar.template'
import { defaultStyles } from '@/constans'

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        })
    }

    prepare() {
        this.initState(defaultStyles)
    }

    get template() {
        return createToolbar(this.state)
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
        this.toHTML()
    }

    toHTML() {
        return this.template
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value)

            this.$emit('toolbar:applyStyle', value)

            this.setState(value)
        }
    }
}
