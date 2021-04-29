import { $ } from '@core/dom'
import { Loader } from '@/components/Loader'
import { ActiveRoute } from './ActiveRoute'

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is not providet in router')
        }

        this.$placeholder = $(selector)
        this.routes = routes
        this.page = null
        this.loader = new Loader()

        this.changePageHandler = this.changePageHandler.bind(this)

        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }

    async changePageHandler() {
        if (this.page) {
            this.page.destroy()
        }

        this.$placeholder.clear().append(this.loader)

        let path = Object.keys(this.routes).find(
            (key) => this.routes[key].path === ActiveRoute.hash
        )

        if (!path) {
            path = 'dashboard'
            window.location.hash = 'dashboard'
        }

        const Page = this.routes[path].page

        this.page = new Page(ActiveRoute.param)

        const root = await this.page.getRoot()

        this.$placeholder.clear().append(root)

        this.page.afterRender()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
}
