import Vue from 'vue'
import Vuex from 'vuex'

/** Auth  */
import auth from './modules/auth'
/** Admin  */
import admin from './modules/admin'
import user from './modules/user'
import stream from './modules/stream'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        admin,
        user,
        stream,
    }
})