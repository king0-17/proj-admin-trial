import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';



Vue.use(VueRouter)

const routes = [{
        path: '',
        redirect: '/auth',
    },
    {
        path: '/auth',
        component: () =>
            import ( /* webpackChunkName: "auth" */ '../views/auth/index.vue'),
        children: [{
                path: '/',
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
            }, ,
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
                path: 'stream-group',
                name: 'stream-group',
                meta: {
                    requiresAuth: true,
                    header_text: 'Stream Group',
                },
                component: () =>
                    import ( /* webpackChunkName: "stream-group" */ '../views/admin/modules/stream-group.vue')
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
                path: 'domain',
                name: 'domain',
                meta: {
                    requiresAuth: true,
                    header_text: 'Domain',
                },
                component: () =>
                    import ( /* webpackChunkName: "domain" */ '../views/admin/modules/domain.vue')
            },
            {
                path: 'log',
                name: 'log',
                meta: {
                    requiresAuth: true,
                    header_text: 'Activity Log',
                },
                component: () =>
                    import ( /* webpackChunkName: "log" */ '../views/admin/modules/log.vue')
            },

            {
                path: 'users',
                name: 'users',
                meta: { requiresAuth: true },
                component: () =>
                    import ( /* webpackChunkName: "users" */ '../views/admin/modules/users.vue')
            },
            {
                path: '*',
                component: () =>
                    import ( /* webpackChunkName: "404" */ '../views/404.vue'),
                name: 'NotFound'
            }

        ]
    },
]


const router = new VueRouter({
    //mode: 'history',
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