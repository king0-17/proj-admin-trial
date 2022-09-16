<template>
    <div id="container-login" class="clearfix">
        <div class="spacer-50"></div>
        <div id="login-box" class="mt-5">
            <div class="login-box-inner clearfix">
                <header id="login-header">
                    <h1>Stream</h1>
                    <h4>/admin</h4>
                </header>
                <div class="spacer-40"></div>
                <!-- @reset="onReset" -->
                <!-- @submit="onSubmit -->
                <b-form @submit.prevent="loginUser()">
                    <b-form-group
                        id="username"
                        ref="username"
                        label="Username:"
                        label-for="username"
                    >
                        <b-form-input
                            v-model="payload.username"
                            type="text"
                            placeholder="Username"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <div class="spacer-10"></div>
                    <b-form-group
                        id="password"
                        ref="password"
                        label="Password:"
                        label-for="password"
                    >
                        <b-form-input
                            v-model="payload.password"
                            type="password"
                            placeholder="Password"
                            required
                        ></b-form-input>
                    </b-form-group>
                    <div class="spacer-30"></div>

                    <b-button
                        type="submit"
                        variant="default"
                        class="w-100"
                        @click.prevent="loginUser()"
                        >Login</b-button
                    >
                </b-form>
                <!-- <form id="form-login">
                    <div class="row">
                        <div class="col-lg-12">
                            <label for="fc-id-1">Username:</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <input
                                class="form-control"
                                type="text"
                                placeholder="Username"
                                id="fc-id-1"
                                tabindex="1"
                            />
                        </div>
                    </div>
                    <div class="spacer-10"></div>
                    <div class="row">
                        <div class="col-lg-12">
                            <label for="fc-id-2">Password:</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <input
                                class="form-control"
                                type="password"
                                placeholder="Password"
                                id="fc-id-2"
                                tabindex="2"
                            />
                        </div>
                    </div>
                    <div class="spacer-30"></div>

                    <div class="row">
                        <div class="col-lg-12">
                            <b-button
                                variant="default"
                                class="w-100"
                                @click="loginUser()"
                                >Login</b-button
                            >
                        </div>
                    </div>  
                </form> -->
            </div>
        </div>
        <footer id="login-footer">
            <strong>Copyright © 2022 .ARA</strong>
            <div class="spacer-5"></div>
            <small> All rights reserved.</small>
        </footer>
        <!-- <table class="env-table">
            <tr>
                <td>VUE_APP_API_URL</td>
                <td>{{ env.VUE_APP_API_URL }}</td>
            </tr>
            <tr>
                <td>VUE_APP_SOCKET</td>
                <td>{{ env.VUE_APP_SOCKET }}</td>
            </tr>
            <tr>
                <td>VUE_APP_MODE</td>
                <td>{{ env.VUE_APP_MODE }}</td>
            </tr>
            <tr>
                <td>VUE_APP_PUSHER_APP_CLUSTER</td>
                <td>{{ env.VUE_APP_PUSHER_APP_CLUSTER }}</td>
            </tr>
            <tr>
                <td>VUE_APP_PUSHER_APP_KEY</td>
                <td>{{ env.VUE_APP_PUSHER_APP_KEY }}</td>
            </tr>
            <tr>
                <td>VUE_APP_WEBSOCKET_KEY</td>
                <td>{{ env.VUE_APP_WEBSOCKET_KEY }}</td>
            </tr>
            <tr>
                <td>VUE_APP_WEBSOCKET_SERVER</td>
                <td>{{ env.VUE_APP_WEBSOCKET_SERVER }}</td>
            </tr>
        </table> -->
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            payload: {
                username: "",
                password: "",
            },
        };
    },
    computed: {
        env() {
            return process.env;
        },
    },
    methods: {
        ...mapActions("auth", {
            authLogin: "loginUser",
        }),
        async loginUser() {
            var vm = this;
            if (vm.payload.username == "" || vm.payload.password == "") {
                return;
            }

            const res = await vm.authLogin(vm.payload);
            if (res.status == 200) {
                this.$router.push("/console").catch(() => {});
                // window.location.reload(); //router guard will redirect
            } else {
                vm.$bvToast.show("top-center-toast");
            }
        },
    },
    mounted() {
        console.log(process.env);
    },
};
</script>

<style>
/* @import ".css/login.css"; */
@import "../../../assets/karma/css/login.css";
.env.table,
.env.table th,
.env.table td {
    border: 1px solid #bbb;
    border-collapse: collapse;
}

.env.table {
    width: 100%;
    font-size: 10px;
}
</style>
