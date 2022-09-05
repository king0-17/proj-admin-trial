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
            <li class="active">
                <a href="#sidebar-tab-1">
                    <i class="fa fa-bars"></i> Navigation
                </a>
            </li>
            <!-- <li>
                    <a href="#sidebar-tab-2">
                        <i class="fa fa-folder"></i> Folders
                    </a>
            </li>-->
        </ul>
        <!-- End .ext-tabs-sidebar -->
        <div class="tab-content">
            <div id="sidebar-tab-1" class="tab-pane active clearfix">
                <!-- ********** -->
                <!-- NEW MODULE -->
                <!-- ********** -->

                <div class="sidebar-module">
                    <nav class="sidebar-nav-v2">
                        <ul>
                            <!-- <li
                                :class="`${
                                    $route.fullPath == '/admin/dashboard'
                                        ? 'page-arrow'
                                        : ''
                                }`"
                            >
                                <router-link to="/admin/dashboard">
                                    <i class="fa fa-dashboard"></i> Dashboard
                                </router-link>
                            </li> -->
                            <li
                                :class="`${
                                    $route.fullPath == '/admin/users'
                                        ? 'page-arrow'
                                        : ''
                                }`"
                            >
                                <router-link to="/admin/users">
                                    <i class="fa fa-users"></i> Users
                                </router-link>
                            </li>
                        </ul>
                    </nav>
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
