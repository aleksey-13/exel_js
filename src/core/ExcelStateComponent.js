import { ExcelComponent } from './ExcelComponent'

export class ExcelStateComponent extends ExcelComponent {
    constructor(...arg) {
        super(...arg)
    }

    get template() {
        return JSON.stringify(this.state, null, 2)
    }

    initState(state = {}) {
        this.state = { ...state }
    }

    setState(newState) {
        this.state = { ...this.state, ...newState }

        this.$root.html(this.template)
    }
}
