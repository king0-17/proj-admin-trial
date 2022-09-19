<template>
    <div class="window">
        <div class="inner-padding">
            <div>
                <div class="pull-left">
                    <form>
                        <div class="toolbar-field">
                            <strong>Search</strong>
                            <b-input
                                type="text"
                                class="form-control"
                                id="search"
                                placeholder="Enter keyword"
                                v-model="filters.search" />
                        </div>
                        <div class="toolbar-field">
                            <strong>Type</strong>
                            <b-select
                                class="form-control"
                                v-model="filters.type"
                                :options="type_options"></b-select>
                        </div>
                        <div class="toolbar-field">
                            <strong>&nbsp;</strong>
                            <b-button
                                class="btn btn-default"
                                variant="default"
                                @click.prevent="getList(1)">
                                Filter
                            </b-button>
                            <b-button
                                class="btn btn-default"
                                variant="default"
                                @click.prevent="getList(1, true)">
                                Reset
                            </b-button>
                        </div>
                    </form>
                </div>
                <div class="pull-right">
                    <div class="toolbar-field">
                        <strong>&nbsp;</strong>
                        <b-button
                            variant="warning"
                            pill
                            @click="showForm('add')"
                            id="create">
                            <i class="fa fa-plus text-white"></i>
                            Add</b-button
                        >
                    </div>
                </div>
            </div>
            <div class="search-bar mt-5"></div>

            <div>
                <b-table
                    striped
                    hover
                    outlined
                    :items="admin_data.list"
                    :fields="fields">
                    <template #cell(name)="row">
                        {{ row.item.first_name + " " + row.item.last_name }}
                    </template>
                    <template #cell(status)="row">
                        <span
                            :class="`label label-${
                                row.item.status == 2
                                    ? 'primary'
                                    : row.item.status == 1
                                    ? 'default'
                                    : ''
                            }`"
                            >{{
                                row.item.status == 2
                                    ? "Active"
                                    : row.item.status == 1
                                    ? "Inactive"
                                    : ""
                            }}</span
                        >
                    </template>
                    <template #cell(actions)="row">
                        <b-button
                            class="mb-0"
                            variant="-secondary"
                            size="sm"
                            pill
                            @click="showForm('edit', row.item)">
                            <i class="fa fa-fw"></i>
                        </b-button>
                        <b-button
                            class="mb-0"
                            variant="outline-secondary"
                            size="sm"
                            pill
                            @click="remove(row.item)">
                            <i class="fa fa-trash-o"></i>
                        </b-button>
                    </template>
                </b-table>
            </div>
            <div class="spacer-20"></div>
            <Pagination
                v-if="admin_data.list.length > 0"
                :data="admin_data"
                @emitpage="getList" />
        </div>

        <b-overlay
            :show="busy"
            no-wrap
            opacity=".3"
            spinner-type="grow"></b-overlay>

        <b-modal
            id="modal-form"
            centered
            size="md"
            @hidden="reset()"
            body-class="position-static">
            <b-overlay
                :show="busy"
                no-wrap
                opacity=".3"
                spinner-type="grow"></b-overlay>
            <template #modal-header>
                <h5 class="modal-head-title">
                    {{
                        mode == "add"
                            ? "Add new administrator"
                            : "Edit administrator"
                    }}
                </h5>
                <button class="close" @click="$bvModal.hide('modal-form')">
                    ×
                </button>
            </template>
            <template>
                <b-container fluid>
                    <!-- <b-form @submit="onSubmit" @reset="onReset"> -->

                    <b-form autocomplete="off" @submit.prevent="submit()">
                        <b-row>
                            <b-col cols="">
                                <b-form-group
                                    label="Type:"
                                    label-for="type"
                                    :description="re.type">
                                    <b-form-select
                                        id="type"
                                        class="form-control"
                                        v-model="pl.type"
                                        :options="type_options"
                                        required></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="">
                                <b-form-group
                                    label="Status:"
                                    label-for="type"
                                    :description="re.status">
                                    <b-form-select
                                        id="status"
                                        class="form-control"
                                        v-model="pl.status"
                                        :options="status_options"
                                        required></b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group
                                    label="First Name:"
                                    label-for="firstname"
                                    :description="re.first_name">
                                    <b-form-input
                                        id="firstname"
                                        v-model="pl.first_name"
                                        type="text"
                                        placeholder="Enter first name"
                                        required></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group
                                    label="Last Name:"
                                    label-for="lastname"
                                    :description="re.last_name">
                                    <b-form-input
                                        id="lastname"
                                        v-model="pl.last_name"
                                        type="text"
                                        placeholder="Enter last name"
                                        required></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group
                                    label="Email Address:"
                                    label-for="email"
                                    :description="re.email">
                                    <b-form-input
                                        id="email"
                                        v-model="pl.email"
                                        type="email"
                                        placeholder="Enter email address"
                                        required></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group
                                    label="Username:"
                                    label-for="username"
                                    :description="re.username">
                                    <b-form-input
                                        id="username"
                                        v-model="pl.username"
                                        type="text"
                                        placeholder="Enter username"
                                        autocomplete="off"
                                        required></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row v-show="mode != 'edit'">
                            <b-col>
                                <b-form-group
                                    label="Password:"
                                    label-for="password"
                                    :description="re.password">
                                    <b-form-input
                                        id="password"
                                        v-model="pl.password"
                                        type="password"
                                        placeholder="Enter password"
                                        autocomplete="new-password"
                                        required></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row v-show="mode != 'edit'">
                            <b-col>
                                <b-form-group
                                    label="Confirm Password:"
                                    label-for="Confirm password"
                                    :description="re.password_confirmation">
                                    <b-form-input
                                        id="password"
                                        v-model="pl.password_confirmation"
                                        type="password"
                                        placeholder="Enter password confirmation"
                                        autocomplete="new-password"
                                        required></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-form>
                </b-container>
            </template>
            <template #modal-footer>
                <button
                    class="btn btn-default"
                    @click="$bvModal.hide('modal-form')">
                    Cancel
                </button>

                <b-button
                    ref="button"
                    variant="success"
                    @click.prevent="submit()">
                    Submit
                </b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Pagination from "@/components/Pagination";
export default {
    components: {
        Pagination,
    },
    data() {
        return {
            busy: false,
            mode: "",
            filters: {
                type: null,
                search: "",
            },
            fields: [
                "name",
                { key: "username", label: "Username" },
                {
                    key: "type",
                    label: "Type",
                    formatter: (value, key, item) => {
                        return this.formatUserType(value);
                    },
                },
                "status",
                { key: "actions", label: "Actions" },
                // {
                //     key: "last_login",
                //     label: "Last Logged In",
                // },
                // { key: "updated_by", label: "Updated By" },
            ],
            type_options: [
                {
                    value: null,
                    text: "Select type",
                },
                {
                    value: 1,
                    text: "Admin Level III",
                },
                {
                    value: 2,
                    text: "Admin Level II",
                },
                {
                    value: 3,
                    text: "Admin Level I",
                },

                // { value: "d", text: "This one is disabled", disabled: true },
            ],
            status_options: [
                {
                    value: null,
                    text: "Select status",
                },
                {
                    value: 1,
                    text: "Inactive",
                },
                {
                    value: 2,
                    text: "Active",
                },
            ],
            pl: {
                id: null,
                email: null,
                first_name: null,
                last_name: null,
                username: null,
                password: null,
                password_confirmation: null,
                type: null,
                status: null,
            },
            re: {
                id: null,
                email: null,
                first_name: null,
                last_name: null,
                username: null,
                password_confirmation: null,
                password: null,
                type: null,
                status: null,
            },
        };
    },
    computed: {
        ...mapState("admin", {
            admin_data: "data",
        }),
    },
    methods: {
        ...mapActions("admin", {
            adminGetList: "getList",
            adminGetOne: "getOne",
            adminCreate: "create",
            adminUpdate: "update",
        }),
        showForm(m, r) {
            var vm = this;
            vm.mode = m;
            if (m == "edit") {
                vm.pl.id = r.id;
                vm.pl.username = r.username;
                // vm.pl.password = r.password;
                // vm.pl.password_confirmation = r.password_confirmation;
                vm.pl.email = r.email;
                vm.pl.first_name = r.first_name;
                vm.pl.last_name = r.last_name;
                vm.pl.type = r.type;
                vm.pl.status = r.status;
            }

            vm.$bvModal.show("modal-form");
        },
        getList(n, reset) {
            var vm = this;

            var pl = {
                page_no: n ? n : 1,
                limit: 50,
                sort_column: "username",
                sort_order: "desc",
            };

            if (reset) {
                vm.filters.search = "";
                vm.filters.type = null;
            }

            if (vm.filters.search) {
                pl.search = vm.filters.search;
            }
            if (vm.filters.type) {
                pl.type = vm.filters.type;
            }

            vm.busy = true;
            vm.adminGetList(pl);
            setTimeout(() => {
                vm.busy = false;
            }, 1000);
        },
        async submit() {
            var vm = this;
            vm.busy = true;
            const res =
                vm.mode == ""
                    ? await vm.adminCreate(vm.pl)
                    : await vm.adminUpdate(vm.pl);
            vm.busy = false;
            if (res.status == 200) {
                if (res.data.status == 2) {
                    vm.$bvModal.hide("modal-form");
                    vm.$bvToast.toast(`Created new administrator`, {
                        title: `Success`,
                        toaster: `b-toaster-top-right`,
                        solid: true,
                        variant: "success",
                        appendToast: true,
                    });
                }
            } else if (res.status == 422) {
                var e = res.data.errors;
                vm.re.type = e.type ? e.type[0] : null;
                vm.re.status = e.status ? e.status[0] : null;
                vm.re.email = e.email ? e.email[0] : null;
                vm.re.first_name = e.first_name ? e.first_name[0] : null;
                vm.re.last_name = e.last_name ? e.last_name[0] : null;
                vm.re.username = e.username ? e.username[0] : null;
                vm.re.password = e.password ? e.password[0] : null;
                vm.re.password_confirmation = e.password_confirmation
                    ? e.password_confirmation[0]
                    : null;
            }
        },
        async remove(r) {
            var vm = this;
            vm.$swal({
                title: "Are you sure?",
                html: `This will <strong>delete</strong> ${r.username} from administrators`,
                type: "warning",
                showCancelButton: true,
                padding: "2em",
            }).then((result) => {
                return result.isConfirmed;
            });
        },
        reset() {
            var vm = this;
            vm.pl.id = null;
            vm.pl.email = null;
            vm.pl.first_name = null;
            vm.pl.last_name = null;
            vm.pl.username = null;
            vm.pl.password = null;
            vm.pl.password_confirmation = null;
            vm.pl.type = null;
            vm.pl.status = null;

            vm.re.id = null;
            vm.re.email = null;
            vm.re.first_name = null;
            vm.re.last_name = null;
            vm.re.username = null;
            vm.re.password = null;
            vm.re.password_confirmation = null;
            vm.re.type = null;
            vm.re.status = null;
        },
    },
    mounted() {
        this.getList(1);
    },
};
</script>

<style></style>
