import $api from '../../api'
const state = {
    data: {
        list: [],
        links: [],
        current_page: 0,
        last_page: 0,
        per_page: 0,
        total: 0
    },
    users: []
}

const actions = {
    getList({ commit, rootGetters, dispatch }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/user/list${pl.page_no ? '?page=' + pl.page_no : ''}`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        commit('setData', res.data.data)
                        resolve(true)
                    }
                })
                .catch(function(err) {
                    if (err.response.status == 401) {
                        dispatch('auth/logoutUser', {}, { root: true }).then(() => {
                            window.location.reload()
                        })
                    }
                })
        })
    },
    getOne({ rootGetters, dispatch }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/user/get`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        resolve(res.data.data)
                    }
                })
                .catch(function(err) {
                    if (err.response.status == 401) {
                        dispatch('auth/logoutUser', {}, { root: true }).then(() => {
                            window.location.reload()
                        })
                    }
                })
        })
    },
    getUsers({ commit, rootGetters, dispatch }) {
        return new Promise(function(resolve) {

            var pl = {
                sort_column: 'username',
                sort_order: 'asc',
                limit: 1000
            }

            $api.post(`/user/list`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {

                        commit('setusers', res.data.data.data)

                        resolve(true)
                    }
                })
                .catch(function(err) {
                    if (err.response.status == 401) {
                        dispatch('auth/logoutUser', {}, { root: true }).then(() => {
                            window.location.reload()
                        })
                    }
                })
        })
    },
    create({ rootGetters, dispatch }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }

            $api.post('/user/create', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        temp.message = 'Success'
                        resolve(temp)
                    } else {
                        var msg = res.data.messaage
                        if (msg.name) {
                            temp.message = msg.name[0]
                        }
                        resolve(temp)
                    }
                })
                .catch(function(err) {
                    if (err.response.status == 401) {
                        dispatch('auth/logoutUser', {}, { root: true }).then(() => {
                            window.location.reload()
                        })
                    }
                })
        })
    },
    update({ rootGetters, dispatch }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }

            var new_pl = {
                id: pl.id,
                firstname: pl.firstname,
                lastname: pl.lastname,
                email: pl.email,
                phone: pl.phone,
                birthdate: pl.birthdate,
                type: pl.type,
                group_id: pl.group_id,
                username: pl.username,
            }

            $api.post('/user/update', new_pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        temp.message = 'Success'
                        resolve(temp)
                    } else {
                        var msg = res.data.messaage
                        if (msg.name) {
                            temp.message = msg.name[0]
                        }
                        resolve(temp)
                    }
                })
                .catch(function(err) {
                    if (err.response.status == 401) {
                        dispatch('auth/logoutUser', {}, { root: true }).then(() => {
                            window.location.reload()
                        })
                    }
                })
        })
    },
    updatePassword({ rootGetters, dispatch }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }
            $api.post('/user/update-password', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        temp.message = `Success Change password`
                        resolve(temp)
                    } else {
                        temp.message = `Failed to change password`
                        resolve(temp)
                    }
                })
                .catch(function(err) {
                    if (err.response.status == 401) {
                        dispatch('auth/logoutUser', {}, { root: true }).then(() => {
                            window.location.reload()
                        })
                    }
                })
        })
    },
    updateStatus({ rootGetters, dispatch }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }
            $api.post('/user/update-status', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        temp.message = `Success Change Status`
                        resolve(temp)
                    } else {
                        temp.message = `Failed to change status`
                        resolve(temp)
                    }
                })
                .catch(function(err) {
                    if (err.response.status == 401) {
                        dispatch('auth/logoutUser', {}, { root: true }).then(() => {
                            window.location.reload()
                        })
                    }
                })
        })
    },
    delete({ rootGetters, dispatch }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }
            $api.post('/user/delete', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        temp.message = 'Success'
                        resolve(temp)
                    }
                    resolve(temp)
                })
                .catch(function(err) {
                    if (err.response.status == 401) {
                        dispatch('auth/logoutUser', {}, { root: true }).then(() => {
                            window.location.reload()
                        })
                    }
                })
        })
    },
    cashIn({ rootGetters, dispatch }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }
            $api.post('/user/cashin', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        temp.message = 'Success'
                        resolve(temp)
                    }
                    resolve(temp)
                })
                .catch(function(err) {
                    if (err.response.status == 401) {
                        dispatch('auth/logoutUser', {}, { root: true }).then(() => {
                            window.location.reload()
                        })
                    }
                })
        })
    },
    cashOut({ rootGetters, dispatch }, pl) {
        return new Promise(function(resolve) {
            var temp = {
                success: false,
                message: '',
            }
            $api.post('/user/cashout', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.data.status == 1) {
                        temp.success = true
                        temp.message = 'Success'
                        resolve(temp)
                    }
                    resolve(temp)
                })
                .catch(function(err) {
                    if (err.response.status == 401) {
                        dispatch('auth/logoutUser', {}, { root: true }).then(() => {
                            window.location.reload()
                        })
                    }
                })
        })
    },
}

const mutations = {
        setData(state, d) {
            state.data.list = d.data
            state.data.links = d.links
            state.data.current_page = d.current_page
            state.data.last_page = d.last_page
            state.data.per_page = d.per_page
            state.data.total = d.total
        },
        setusers(state, d) {
            state.users = d
        },
    }
    //array1.find(element => element > 10)
const getters = {

}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters,
}