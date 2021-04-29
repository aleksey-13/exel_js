import {
    TABLE_RESIZE,
    CHANGE_TEXT,
    CHANGE_STYLES,
    APPLY_STYLE,
    SET_TABLE_NAME,
    UPDATE_DATE
} from './types'

export const tableResizeAction = (payload) => ({ type: TABLE_RESIZE, payload })

export const changeTextAction = (payload) => ({ type: CHANGE_TEXT, payload })

export const changeStylesAction = (payload) => ({
    type: CHANGE_STYLES,
    payload
})

export const applyStyleAction = (payload) => ({
    type: APPLY_STYLE,
    payload
})

export const setTableNameAction = (payload) => ({
    type: SET_TABLE_NAME,
    payload
})

export const updateDateAction = () => ({
    type: UPDATE_DATE,
    payload: new Date().toJSON()
})
