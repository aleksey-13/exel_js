import { createStore } from './createStore'

const initialState = {
    value: 0
}

const reducer = (state = {}, action) => {
    if (action.type === 'ADD') {
        return { ...state, value: state.value + 1 }
    }

    return state
}

describe('createStore:', () => {
    let store, handler

    beforeEach(() => {
        store = createStore(reducer, initialState)
        handler = jest.fn()
    })

    test('should return store object', () => {
        expect(store).toBeDefined()
        expect(store.dispatch).toBeDefined()
        expect(store.subscribe).toBeDefined()
        expect(store.getState).not.toBeUndefined()
    })

    test('should return object as the state', () => {
        expect(store.getState()).toBeInstanceOf(Object)
    })

    test('should return default state', () => {
        expect(store.getState()).toEqual(initialState)
    })

    test('should change state if action exists', () => {
        store.dispatch({ type: 'ADD' })
        expect(store.getState().value).toBe(1)
    })

    test("should not change state if action doesn't exists", () => {
        store.dispatch({ type: 'TEST' })
        expect(store.getState().value).toBe(0)
    })

    test('should call subscriber function', () => {
        store.subscribe(handler)
        store.dispatch({ type: 'ADD' })

        expect(handler).toHaveBeenCalled()
        expect(handler).toHaveBeenCalledWith(store.getState())
    })

    test('should NOT call subscriber function', () => {
        const unsubscribe = store.subscribe(handler)
        unsubscribe.unsubscribe()
        store.dispatch({ type: 'ADD' })

        expect(handler).not.toHaveBeenCalled()
    })

    test('should dispatch in async way', () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                store.dispatch({ type: 'ADD' })
            }, 500)

            setTimeout(() => {
                expect(store.getState().value).toBe(1)
                resolve()
            }, 1000)
        })
    })
})
