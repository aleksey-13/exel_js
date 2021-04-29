import { defaultStyles, defaultTitle } from '@/constans'

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultStyles,
    tableName: defaultTitle,
    openDate: new Date().toJSON()
}

const normalize = (state) => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

export const normalizeInitState = (state) => {
    return state ? normalize(state) : defaultState
}
