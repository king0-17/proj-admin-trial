import Vue from 'vue'
import Vuex from 'vuex'

/** Auth  */
import auth from './modules/auth'
/** Admin  */
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth,
        user,
    }
})