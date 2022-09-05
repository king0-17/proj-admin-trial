<template>
    <header id="header-main">
        <div class="header-main-top">
            <div class="pull-left">
                <a href="index.html" id="logo-small">
                    <h4>Stream</h4>
                    <h5>/admin</h5>
                </a>
            </div>
            <div class="pull-right">
                <a href="#" id="responsive-menu-trigger">
                    <i class="fa fa-bars"></i>
                </a>
            </div>
        </div>
        <div class="header-main-bottom">
            <div class="pull-left">
                <b-breadcrumb>
                    <b-breadcrumb-item active>Admin</b-breadcrumb-item>
                    <b-breadcrumb-item active>Users</b-breadcrumb-item>
                </b-breadcrumb>
            </div>
            <!-- <div class="pull-right">
                <p>Version 1.0.0</p>
            </div> -->
        </div>
    </header>
</template>

<script>
export default {
    name: "AppHeader",
};
</script>
