import { Router } from '@core/routes/Router'
import { DashboardPage } from './pages/DashboardPage'
import { ExcelPage } from './pages/ExcelPage'

import './scss/index.scss'

new Router('#app', {
    dashboard: {
        page: DashboardPage,
        path: 'dashboard'
    },
    excel: {
        page: ExcelPage,
        path: 'excel'
    }
})
