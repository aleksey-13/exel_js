import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { shouldResize, isCell, matrix, nextSelector } from './table.functions'
import { TableSelection } from './TableSelection'
import { $ } from '@core/dom'
import * as actions from '@/store/actions'
import { defaultStyles } from '@/constans'
import { parse } from '@core/parse'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })

        this.current = null

        this.colWidth = 120
        this.rowHeight = 24
        this.rowsCount = 5
    }

    toHTML() {
        const state = this.store.getState()

        return createTable(this.rowsCount, state)
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        const $cell = this.$root.find('[data-id="0:0"]')
        this.selectCell($cell)
        this.current = $cell

        this.$on('formula:input', (value) => {
            this.current.attr('data-value', value).text(parse(value))
            this.updateTextInStore(value)
        })
        this.$on('formula:unfocus', () => this.current.focus())
        this.$on('toolbar:applyStyle', (value) => {
            this.selection.applyStyle(value)
            this.$dispatch(
                actions.applyStyleAction({
                    value,
                    ids: this.selection.selectedIds
                })
            )
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))
        this.$dispatch(actions.changeStylesAction(styles))
    }

    resizeTable(event) {
        resizeHandler(this.$root, event).then((data) => {
            this.$dispatch(actions.tableResizeAction(data))
        })
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)

            if (event.shiftKey) {
                const ids = matrix(this.current, $target)

                const $cells = ids.map((id) =>
                    this.$root.find(`[data-id="${id}"]`)
                )

                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)

                this.current = $target
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowDown',
            'ArrowUp',
            'ArrowRight',
            'ArrowLeft'
        ]

        const { key } = event

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()

            const id = this.current.id(true)

            const $nextCell = this.$root.find(nextSelector(key, id))
            this.current = $nextCell

            this.selectCell($nextCell)
        } else {
        }
    }

    updateTextInStore(text) {
        this.$dispatch(
            actions.changeTextAction({
                value: text,
                id: this.current.id()
            })
        )
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text())
    }
}
