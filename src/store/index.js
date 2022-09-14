import Vue from 'vue'
import Vuex from 'vuex'

/** Auth  */
import auth from './modules/auth'
/** Admin  */
import admin from './modules/admin'
import user from './modules/user'
import stream_group from './modules/stream_group'
import stream from './modules/stream'
import domain from './modules/domain'
import log from './modules/log'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: false
    },
    mutations: {},
    actions: {},
    modules: {
        auth,
        admin,
        user,
        stream_group,
        stream,
        domain,
        log,
    }
})