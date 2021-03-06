import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options
        })
    }

    init() {
        super.init()
        this.$formula = this.$root.find('#formula')

        this.$on('table:select', (text) => {
            this.$formula.text(text)
        })

        this.$on('table:input', (text) => {
            this.$formula.text(text)
        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="formula" class="input" contenteditable="true" spellcheck="false"></div>
        `
    }

    onInput(e) {
        this.$emit('formula:input', $(e.target).text())
    }

    onKeydown(event) {
        const keys = [9, 13]
        const { keyCode } = event

        if (keys.includes(keyCode)) {
            event.preventDefault()

            this.$emit('formula:blur')

            this.$formula.text('')
            this.$formula.blur()
        }
    }
}
