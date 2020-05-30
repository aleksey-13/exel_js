import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHanbler } from './table.resize'
import { shouldResize } from './table.functions'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable()
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHanbler(event, this.$root)
        }
    }
}
