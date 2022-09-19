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
        return new Promise(async function(resolve) {
            // const f = await fetch('/sample_data/admin.json')
            //     .then((response) => response.json())

            // commit('setData', f)

            $api.post(`/admin/list${pl.page_no ? '?page=' + pl.page_no : ''}`, pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.status == 200) {
                        commit('setData', res.data)
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
            $api.post(`/admin/get`, pl, {
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

            $api.post(`/admin/list`, pl, {
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
            $api.post('/admin/create', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.status == 200) {
                        resolve(res)
                    }
                })
                .catch(function(err) {
                    if (err.response.status == 401) {
                        dispatch('auth/logoutUser', {}, { root: true }).then(() => {
                            window.location.reload()
                        })
                    }
                    if (err.response.status == 422) {
                        resolve(err.response)
                    }
                })
        })
    },
    update({ rootGetters, dispatch }, pl) {
        return new Promise(function(resolve) {
            $api.post('/admin/update', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    if (res.status == 200) {
                        resolve(res)
                    }
                })
                .catch(function(err) {
                    if (err.response.status == 401) {
                        dispatch('auth/logoutUser', {}, { root: true }).then(() => {
                            window.location.reload()
                        })
                    }
                    if (err.response.status == 422) {
                        resolve(err.response)
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
            $api.post('/admin/update-password', pl, {
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
            $api.post('/admin/update-status', pl, {
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
            $api.post('/admin/delete', pl, {
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
            $api.post('/admin/cashin', pl, {
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
            $api.post('/admin/cashout', pl, {
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
        clearData(state) {
            state.data.list = []
            state.data.links = []
            state.data.current_page = 0
            state.data.last_page = 0
            state.data.per_page = 0
            state.data.total = 0
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