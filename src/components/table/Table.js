import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHanbler } from './table.resize'
import {
    shouldResize,
    shouldSelected,
    matrix,
    nextSelector
} from './table.functions'
import { TableSelection } from './TableSelection'
import { $ } from '@core/dom'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    toHTML() {
        return createTable()
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        this.selectCell(this.$root.find('[data-id="1:1"]'))

        this.$on('formula:input', (text) => this.selection.current.text(text))
        this.$on('formula:blur', () => this.selection.current.focus())
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHanbler(event, this.$root)
        } else if (shouldSelected(event)) {
            const $cell = $(event.target)
            if (event.shiftKey) {
                const $cells = matrix($cell, this.selection.current).map((id) =>
                    this.$root.find(`[data-id="${id}"]`)
                )

                this.selection.selectGroup($cells)
            } else {
                this.selectCell($cell)
            }
        }
    }

    onKeydown(event) {
        const keys = [9, 13, 37, 38, 39, 40]
        const { keyCode } = event

        if (keys.includes(keyCode) && !event.shiftKey) {
            event.preventDefault()

            const $next = this.$root.find(
                nextSelector(keyCode, this.selection.current)
            )

            if ($next.isAttend()) {
                this.selectCell($next)
            }
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target).text())
    }

    selectCell(cell) {
        this.selection.select(cell)
        this.$emit('table:select', this.selection.current.text())
    }
}
