import { Router } from './Router'

describe('router:', () => {
    let router, $root

    beforeEach(() => {
        $root = document.createElement('div')
        router = new Router({ $root, dashboard: '', excel: '' })
    })

    test('shoud be defined', () => {
        expect(router).toBeDefined()
    })
})
