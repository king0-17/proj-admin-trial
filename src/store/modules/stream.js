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
            const f = await fetch('http://localhost:8080/sample_data/stream.json')
                .then((response) => response.json())

            commit('setData', f)

            // $api.post(`/stream/list${pl.page_no ? '?page=' + pl.page_no : ''}`, pl, {
            //         headers: { 'Authorization': rootGetters['auth/token_bearer'] }
            //     })
            //     .then(function(res) {
            //         if (res.data.status == 1) {
            //             commit('setData', res.data.data)
            //             resolve(true)
            //         }
            //     })
            //     .catch(function(err) {
            //         if (err.response.status == 401) {
            //             dispatch('auth/logoutUser', {}, { root: true }).then(() => {
            //                 window.location.reload()
            //             })
            //         }
            //     })
        })
    },
    getOne({ rootGetters, dispatch }, pl) {
        return new Promise(function(resolve) {
            $api.post(`/stream/get`, pl, {
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

            $api.post(`/stream/list`, pl, {
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

            $api.post('/stream/register', pl, {
                    headers: { 'Authorization': rootGetters['auth/token_bearer'] }
                })
                .then(function(res) {
                    console.log(res)
                        // if (res.data.status == 1) {
                        //     temp.success = true
                        //     temp.message = 'Success'
                        //     resolve(temp)
                        // } else {
                        //     var msg = res.data.messaage
                        //     if (msg.name) {
                        //         temp.message = msg.name[0]
                        //     }
                        //     resolve(temp)
                        // }
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

            $api.post('/stream/update', new_pl, {
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
            $api.post('/stream/update-password', pl, {
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
            $api.post('/stream/update-status', pl, {
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
            $api.post('/stream/delete', pl, {
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
            $api.post('/stream/cashin', pl, {
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
            $api.post('/stream/cashout', pl, {
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
            state.data.list = d.list
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