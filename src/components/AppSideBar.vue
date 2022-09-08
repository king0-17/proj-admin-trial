<template>
    <div>
        <div class="sidebar-logo">
            <a href="index.html" id="logo-big">
                <h1>Stream</h1>
                <h2>/admin</h2>
            </a>
        </div>

        <div class="sidebar-module">
            <div class="sidebar-profile">
                <img
                    src="@/assets/karma/images/icons/social/32/favicon-32x32.png"
                    alt
                    class="avatar"
                />

                <ul class="sidebar-profile-list">
                    <li>
                        <h3>admin</h3>
                    </li>
                    <li>
                        <a
                            href="javascript:void(0)"
                            @click.prevent="logoutUser()"
                            >Logout</a
                        >
                    </li>
                </ul>
            </div>
        </div>

        <div class="sidebar-line"></div>

        <ul class="ext-tabs-sidebar">
            <li :class="`${tab == 1 ? 'active' : ''}`">
                <a href="#sidebar-tab-1" @click.prevent="tab = 1">
                    <i class="fa fa-bars"></i> Navigation
                </a>
            </li>
            <li :class="`${tab == 2 ? 'active' : ''}`">
                <a href="#sidebar-tab-2" @click.prevent="tab = 2"
                    ><i class="fa fa-edit"></i> Note</a
                >
            </li>
        </ul>
        <div class="tab-content">
            <div
                id="sidebar-tab-1"
                :class="`tab-pane ${tab == 1 ? 'active' : ''} clearfix`"
            >
                <div class="sidebar-module">
                    <nav class="sidebar-nav-v2">
                        <ul>
                            <li
                                :class="`${
                                    $route.fullPath == '/console/administrators'
                                        ? 'page-arrow'
                                        : ''
                                }`"
                            >
                                <router-link to="/console/administrators">
                                    <i class="fa fa-user-md"></i> Administrator
                                </router-link>
                            </li>
                            <li
                                :class="`${
                                    $route.fullPath == '/console/stream-group'
                                        ? 'page-arrow'
                                        : ''
                                }`"
                            >
                                <router-link to="/console/stream-group">
                                    <i class="fa fa-th-large"></i>
                                    Stream Group
                                </router-link>
                            </li>
                            <li
                                :class="`${
                                    $route.fullPath == '/console/stream'
                                        ? 'page-arrow'
                                        : ''
                                }`"
                            >
                                <router-link to="/console/stream">
                                    <i class="fa fa-caret-square-o-right"></i>
                                    Stream
                                </router-link>
                            </li>
                            <li
                                :class="`${
                                    $route.fullPath == '/console/domain'
                                        ? 'page-arrow'
                                        : ''
                                }`"
                            >
                                <router-link to="/console/domain">
                                    <i class="fa fa-link"></i>
                                    Domain
                                </router-link>
                            </li>
                            <li
                                :class="`${
                                    $route.fullPath == '/console/log'
                                        ? 'page-arrow'
                                        : ''
                                }`"
                            >
                                <router-link to="/console/log">
                                    <i class="fa fa-eye"></i>
                                    Activity Log
                                </router-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div
                id="sidebar-tab-2"
                :class="`tab-pane ${tab == 2 ? 'active' : ''} clearfix`"
            >
                <div class="sidebar-module">
                    <textarea
                        id="note"
                        class="form-control noresizing"
                        placeholder="Note"
                        required=""
                        aria-required="true"
                    ></textarea>
                    <div class="spacer-10"></div>
                    <button
                        class="btn btn-block btn-primary"
                        onclick="save_note()"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>

        <div class="sidebar-line"></div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "AppSideBar",
    data() {
        return {
            tab: 1,
        };
    },
    methods: {
        ...mapActions("auth", {
            authLogout: "logoutUser",
        }),
        async logoutUser() {
            var vm = this;
            const res = await vm.authLogout();
            vm.$router.push("/auth").catch(() => {});
        },
    },
};
</script>

<style></style>
