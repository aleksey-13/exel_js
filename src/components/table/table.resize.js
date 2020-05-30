import { $ } from '@core/dom'

export function resizeHanbler(e, root) {
    const $resizer = $(e.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = e.target.dataset.resize

    let value = e.pageX - coords.right

    $resizer.css({ opacity: 1 })

    document.onmousemove = (event) => {
        if (type === 'col') {
            const delta = event.pageX - coords.right
            value = delta + coords.width
            $resizer.css({
                right: -delta + 'px'
            })
        } else {
            const delta = event.pageY - coords.bottom
            value = delta + coords.height
            $resizer.css({
                bottom: -delta + 'px'
            })
        }
    }

    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null

        $resizer.css({ opacity: 0, bottom: 0, right: 0 })

        if (type === 'col') {
            $parent.css({ width: value + 'px' })

            root.findAll(`[data-col="${$parent.data.col}"]`).forEach(
                (el) => (el.style.width = value + 'px')
            )
        } else {
            $parent.css({ height: value + 'px' })
        }
    }
}
