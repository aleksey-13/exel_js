export class ActiveRoute {
    static get path() {
        return window.location.hash.slice(1)
    }

    static get hash() {
        return ActiveRoute.path.split('/')[0]
    }

    static get param() {
        return ActiveRoute.path ? ActiveRoute.path.split('/')[1] : []
    }

    static navigate(path) {
        window.location.hash = path
    }
}
