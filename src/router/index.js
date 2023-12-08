import { createRouter, createWebHistory } from 'vue-router'

import LoginLayout    from '../layouts/LoginLayout.vue'
import DefaultLayout  from '../layouts/DefaultLayout.vue'
import SettingsLayout from '../layouts/SettingsLayout.vue'

import LoginView        from '../views/LoginView.vue'
import SkillsView       from '../views/SkillsView.vue'
import SettingsView     from '../views/SettingsView.vue'
import StatisticView    from '../views/StatisticView.vue'
import PortfolioView    from '../views/PortfolioView.vue'
import InformationsView from '../views/InformationsView.vue'

import Email    from '../components/settings/Email.vue'
import Password from '../components/settings/Password.vue'


const router = createRouter({

    history: createWebHistory( import.meta.env.BASE_URL ),

    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: {
                layout: LoginLayout
            }
        },
        {
            path: '/',
            name: 'statistic',
            component: StatisticView,
            meta : {
                layout: DefaultLayout
            }
        },
        {
            path: '/skills',
            name: 'skills',
            component: SkillsView,
            meta: {
                layout: DefaultLayout
            }
        },
        {
            path: '/portfolio',
            name: 'portfolio',
            component: PortfolioView,
            meta: {
                layout: DefaultLayout
            }
        },
        {
            path: '/informations',
            name: 'informations',
            component: InformationsView,
            meta: {
                layout: DefaultLayout
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsView,
            meta: {
                layout: SettingsLayout
            }
        },
        {
            path: '/settings/password',
            name: 'password',
            component: Password,
            meta: {
                layout: SettingsLayout
            }
        },
        {
            path: '/settings/email',
            name: 'email',
            component: Email,
            meta: {
                layout: SettingsLayout
            }
        },
    ]
})

export default router