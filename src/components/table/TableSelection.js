export class TableSelection {
    #className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    clearSelected() {
        this.group.forEach(($el) => $el.removeClass(this.#className))
        this.group = []
    }

    select($el) {
        if (this.group.length) {
            this.clearSelected()
        }

        this.group.push($el)
        this.current = $el

        $el.addClass(this.#className).focus()
    }

    selectGroup($cells) {
        this.clearSelected()

        this.group = $cells

        this.group.forEach(($el) => {
            $el.addClass(this.#className)
        })
    }
}
