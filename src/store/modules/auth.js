import $api from '../../api'
import $cookies from 'vue-cookies'
const state = {
    token: $cookies.get('token'),
    profile: {
        id: 0,
        username: '',
        type: 0,
        isAdmin: false,
        isDeveloper: false,
        isEngineer: false,
        isManager: false,
        status: 0,
        email: '',
        first_name: '',
        last_name: '',
    },
}

const actions = {
    loginUser({ commit, dispatch }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                status: 0,
                message: '',
                user_id: 0,
            }
            $api.post('auth/login', pl, {})
                .then(async function(res) {
                    // console.log(res)
                    // console.log(temp)
                    temp.status == res.status
                    if (res.status == 200) {
                        await commit('setToken', res.data)

                        // await dispatch('getProfile')
                    } else if (res.status == 401) {
                        temp.message = res.data.message

                    }

                    resolve(res);
                })
                .catch(function(err) {
                    console.log(err.response.data.message)
                })

        })
    },
    logoutUser({ commit, getters }) {
        return new Promise(function(resolve) {
            $api.get('auth/logout', {
                headers: { 'Authorization': getters.token_bearer }
            }).then(function() {
                commit('desToken')
                commit('desUser')
                    // window.location.reload()
                resolve(true)
            }).catch(function() {
                commit('desToken')
                commit('desUser')
                    // window.location.reload()
                resolve(true)
            })
        })
    },
    getProfile({ commit, getters, dispatch }) {
        return new Promise(function(resolve) {
            if (getters.authenticated) {
                $api.get('auth/me', {
                        headers: { 'Authorization': getters.token_bearer }
                    })
                    .then(function(res) {
                        if (res.status == 200) {
                            commit('setUser', res.data)
                            resolve(true)
                        } else {
                            dispatch('logoutUser')
                        }
                    })
                    .catch(function(err) {
                        if (err.response.status == 401) {
                            dispatch('logoutUser').then(() => {
                                window.location.reload()
                            })
                        }
                        // resolve(true)
                    })
            } else {
                resolve(true)
            }
        })
    },
    verifyCode({ dispatch, commit }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                status: 0,
                message: '',
            }
            $api.post('/verify-auth-code', pl, {})
                .then(function(res) {
                    temp.status = res.data.status
                    if (res.data.status == 1) {
                        commit('setToken', res.data.token)
                    } else {
                        temp.message = 'wrong verification code'
                    }
                    resolve(temp);
                })
                .catch(function(err) {
                    if (err.response.status == 401) {
                        dispatch('logoutUser').then(() => {
                            window.location.reload()
                        })
                    }
                })

        })
    },
}

const mutations = {
    setToken(state, t) {
        $cookies.set('token', t.access_token)
        state.token = t.access_token;

    },
    desToken(state) {
        $cookies.remove('token')
        state.token = null
    },
    setUser(state, d) {
        var s = state
        s.profile.id = d.id
        s.profile.username = d.username
        s.profile.type = d.type
        s.profile.isAdmin = d.isAdmin
        s.profile.isDeveloper = d.isDeveloper
        s.profile.isEngineer = d.isEngineer
        s.profile.isManager = d.isManager
        s.profile.status = d.status
        s.profile.email = d.email
        s.profile.first_name = d.first_name
        s.profile.last_name = d.last_name
    },
    desUser(state) {
        var s = state
        s.profile.id = ''
        s.profile.username = ''
        s.profile.type = ''
        s.profile.isAdmin = ''
        s.profile.isDeveloper = ''
        s.profile.isEngineer = ''
        s.profile.isManager = ''
        s.profile.status = ''
        s.profile.email = ''
        s.profile.first_name = ''
        s.profile.last_name = ''
    },
    setMoney(state, amt) {
        state.profile.money += amt
    },
}


const getters = {
    token_bearer(state) {
        return 'Bearer ' + state.token
    },
    authenticated(state) {
        return state.token ? true : false
    },
    user_id(state) {
        return state.profile.id
    },
    user_type(state) {
        return 1 //state.profile.type
    },
    profile(state) {
        return state.profile
    },
    has_money(state) {
        return state.profile.money > 0
    }

}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}