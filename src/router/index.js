import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';


Vue.use(VueRouter)

const routes = [{
        path: '*',
        component: () =>
            import ( /* webpackChunkName: "404" */ '../views/404.vue'),
        name: 'NotFound'
    },
    {
        path: '',
        redirect: '/auth',
    },
    {
        path: '/auth',
        component: () =>
            import ( /* webpackChunkName: "auth" */ '../views/auth/index.vue'),
        children: [{
                path: '',
                redirect: 'login'
            },
            {
                path: 'login',
                name: 'login',
                meta: { requiresVisitor: true },
                component: () =>
                    import ( /* webpackChunkName: "login" */ '../views/auth/modules/login.vue'),
            },
        ]
    },
    {
        path: '/console',
        component: () =>
            import ( /* webpackChunkName: "admin" */ '../views/admin/index.vue'),
        children: [{
                path: '/',
                redirect: 'administrators'
            },
            // {
            //     path: 'dashboard',
            //     name: 'dashboard',
            //     meta: { requiresAuth: true },
            //     component: () =>
            //         import ( /* webpackChunkName: "dashboard" */ '../views/admin/modules/dashboard.vue')
            // },
            {
                path: 'administrators',
                name: 'administrators',
                meta: {
                    requiresAuth: true,
                    header_text: 'Administrators',
                },
                component: () =>
                    import ( /* webpackChunkName: "admin" */ '../views/admin/modules/admin.vue')
            },
            {
                path: 'stream',
                name: 'stream',
                meta: {
                    requiresAuth: true,
                    header_text: 'Stream',
                },
                component: () =>
                    import ( /* webpackChunkName: "stream" */ '../views/admin/modules/stream.vue')
            },
            {
                path: 'users',
                name: 'users',
                meta: { requiresAuth: true },
                component: () =>
                    import ( /* webpackChunkName: "users" */ '../views/admin/modules/users.vue')
            },

        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


const sg = store.getters
const restrictions = require('../restrictions')
const chkprofile = store.dispatch('auth/getProfile')

function getRestriction(user_type) {
    // 1 => "masteradmin",
    //         2 => "admin",
    //         3 => "declarator",
    //         4 => "cashier",
    //         5 => "player",
    //         6 => "manager",
    var access = []
    switch (user_type) {
        case 1:
            access = restrictions.masteradmin
            break
    }
    return access
}

router.beforeEach(async(to, from, next) => {
    var access = []
    if (await chkprofile && to.matched.some(record => record.meta.requiresAuth)) {
        if (!sg['auth/authenticated']) {
            console.log('requiresAuth 1')
            next({
                name: 'login',
            })
        } else {
            console.log('requiresAuth 2')
            access = getRestriction(sg['auth/user_type'])
            if (!access.includes(to.name)) {
                console.log('requiresAuth 2.1')
                next({ name: access[0] })
            } else {
                console.log('requiresAuth 2.2')
                next()
            }
        }
    } else if (await chkprofile && to.matched.some(record => record.meta.requiresVisitor)) {
        if (sg['auth/authenticated']) {
            console.log('requiresVisitor 1')
            access = getRestriction(sg['auth/user_type'])
            next({ name: access[0] })
        } else {
            console.log('requiresVisitor 2')

            next()
        }
    } else {
        next() // make sure to always call next()!
    }

    // if (to.meta && to.meta.layout) {
    //     store.commit('setLayout', to.meta.layout)
    // }
})


export default router