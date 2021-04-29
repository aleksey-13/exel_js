import { isEqual } from '@core/utils'
import { defaultStyles } from '@/constans'

function toButton(btn) {
    const isActive = btn.active ? 'active' : ''

    const meta = `data-type="button" data-value=${JSON.stringify(btn.value)}`
    return `
        <div class="button ${isActive}" ${meta}>
            <i class="material-icons" ${meta}>${btn.icon}</i>
        </div>`
}

function compareValues(state) {
    const keys = Object.keys(state)

    const styles = {
        fontWeight: 'bold',
        fontStyle: 'italic',
        textDecoration: 'underline'
    }

    return (button) => {
        keys.forEach((key) => {
            if (button.value[key]) {
                if (styles[key]) {
                    button.active = isEqual(state[key], styles[key])

                    button.value[key] = isEqual(state[key], styles[key])
                        ? defaultStyles[key]
                        : styles[key]
                } else {
                    button.active = isEqual(button.value[key], state[key])
                }
            }
        })

        return button
    }
}

export function createToolbar(state) {
    const buttons = [
        {
            icon: 'format_align_left',
            active: false,
            value: { textAlign: 'left' }
        },
        {
            icon: 'format_align_center',
            active: false,
            value: { textAlign: 'center' }
        },
        {
            icon: 'format_align_right',
            active: false,
            value: { textAlign: 'right' }
        },
        {
            icon: 'format_bold',
            active: false,
            value: { fontWeight: 'bold' }
        },
        {
            icon: 'format_italic',
            active: false,
            value: { fontStyle: 'italic' }
        },
        {
            icon: 'format_underline',
            active: false,
            value: { textDecoration: 'underline' }
        }
    ]

    return buttons.map(compareValues(state)).map(toButton).join('')
}
