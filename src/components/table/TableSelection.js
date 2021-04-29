export class TableSelection {
    #className = 'selected'

    constructor() {
        this.group = []
    }

    select($el) {
        this.clear()

        this.group.push($el)
        $el.addClass(this.#className).focus()
    }

    get selectedIds() {
        return this.group.map(($el) => $el.id())
    }

    selectGroup($group) {
        this.clear()

        this.group = [...$group]

        this.group.forEach(($el) => $el.addClass(this.#className))
    }

    clear() {
        this.group.forEach(($el) => $el.removeClass(this.#className))
        this.group = []
    }

    applyStyle(style) {
        this.group.forEach(($el) => $el.css(style))
    }
}
