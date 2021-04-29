import { ExcelComponent } from '@core/ExcelComponent'
import { setTableNameAction } from '@/store/actions'
import { $ } from '@core/dom'
import { debounce, removeStorage } from '@core/utils'
import { ActiveRoute } from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    toHTML() {
        const { tableName } = this.store.getState()

        return `
            <input type="text" class="input" value="${tableName}" />

            <div>
                <div class="button" data-button="exit">
                    <i class="material-icons" data-button="exit">exit_to_app</i>
                </div>

                <div class="button" data-button="delete">
                    <i class="material-icons" data-button="delete">delete</i>
                </div>
            </div>
        `
    }

    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(setTableNameAction($target.text()))
    }

    onClick(event) {
        const $target = $(event.target)
        const type = $target.data.button
        if (type === 'exit') {
            ActiveRoute.navigate('')
        } else if (type === 'delete') {
            const decision = confirm('Удалить таблицу?')
            if (decision) {
                const key = 'excel:' + ActiveRoute.param
                removeStorage(key)
                ActiveRoute.navigate('dashboard')
            }
        }
    }
}
