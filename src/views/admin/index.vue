<template>
    <div id="container" class="clearfix">
        <aside id="sidebar-main" class="sidebar">
            <AppSideBar />
        </aside>

        <div id="main" class="clearfix">
            <AppHeader />

            <div id="content" class="clearfix">
                <!-- <header id="header-sec">
                    <div class="inner-padding">
                        <div class="pull-left">
                            <h2 style="text-transform: capitalize">{{ $route.name }}</h2>
                        </div>
                    </div>
                </header> -->

                <router-view></router-view>

                <footer id="footer-main" class="footer-sticky">
                    <div class="footer-main-inner">
                        <div class="pull-left">
                            <p>Copyright © 2013 CreativeMilk</p>
                        </div>
                    </div>
                    <!-- End .footer-main-inner -->
                </footer>
                <!-- End #footer-main -->
            </div>
            <!-- End #content -->
        </div>
    </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppSideBar from "@/components/AppSideBar.vue";

export default {
    name: "AdminIndex",
    components: {
        AppHeader,
        AppSideBar,
    },
    mounted() {},
};
</script>

<style>
#footer-main {
    z-index: 1060 !important;
}
</style>
