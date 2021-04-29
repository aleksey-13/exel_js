import { toInlineStyle } from '../core/utils'
import {
    APPLY_STYLE,
    CHANGE_TEXT,
    CHANGE_STYLES,
    TABLE_RESIZE,
    SET_TABLE_NAME,
    UPDATE_DATE
} from './types'

export function rootReducer(state, action) {
    let field, val
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.payload.type === 'col' ? 'colState' : 'rowState'

            return {
                ...state,
                [field]: value(state, field, action)
            }
        case CHANGE_TEXT:
            return {
                ...state,
                currentText: action.payload.value,
                dataState: value(state, 'dataState', action)
            }
        case CHANGE_STYLES:
            return returnState(state, 'currentStyles', action)
        case APPLY_STYLE:
            field = 'stylesState'
            val = { ...state[field] }

            action.payload.ids.forEach((id) => {
                val[id] = { ...val[id], ...action.payload.value }
            })

            return {
                ...state,
                [field]: val,
                currentStyles: {
                    ...state.currentStyles,
                    ...action.payload.value
                }
            }
        case SET_TABLE_NAME:
            return {
                ...state,
                tableName: action.payload
            }
        case UPDATE_DATE:
            return {
                ...state,
                openDate: action.payload
            }
        default:
            return state
    }
}

function value(state, field, action) {
    const val = { ...state[field] } || {}
    val[action.payload.id] = action.payload.value

    return val
}

function returnState(state, field, action) {
    return {
        ...state,
        [field]: { ...state[field], ...action.payload }
    }
}
