import { $ } from '@core/dom'

export function resizeHandler($root, event) {
    return new Promise((resolve) => {
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        const type = event.target.dataset.resize
        let value

        $resizer.css({ opacity: 1 })

        document.onmousemove = (e) => {
            if (type === 'col') {
                const delta = e.pageX - coords.right
                value = delta + coords.width

                if (value > 40) {
                    $resizer.css({ right: -delta + 'px' })
                } else {
                    value = 40
                }
            } else {
                const delta = e.pageY - coords.bottom
                value = delta + coords.height

                if (value > 10) {
                    $resizer.css({ bottom: -delta + 'px' })
                } else {
                    value = 10
                }
            }
        }

        document.onmouseup = () => {
            if (type === 'col') {
                $resizer.css({ right: 0, opacity: 0 })

                $root
                    .findAll(`[data-col="${$parent.data.col}"]`)
                    .forEach((cell) => (cell.style.width = value + 'px'))
            } else {
                $resizer.css({ bottom: 0, opacity: 0 })
                $parent.css({ height: value + 'px' })
            }
            resolve({
                value,
                id: +$parent.data[type],
                type
            })

            document.onmousemove = null
        }
    })
}
