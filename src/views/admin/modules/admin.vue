<template>
    <div class="window">
        <div class="inner-padding">
            <div>
                <div class="pull-left">
                    <form>
                        <div class="toolbar-field">
                            <strong>Date from</strong>
                            <b-input-group class="mb-3">
                                <b-form-input
                                    id="example-input"
                                    class="date-input"
                                    v-model="filters.date_from"
                                    type="text"
                                    placeholder="YYYY-MM-DD"
                                    autocomplete="off"
                                ></b-form-input>
                                <b-input-group-append>
                                    <b-form-datepicker
                                        v-model="filters.date_from"
                                        button-only
                                        right
                                        locale="en-US"
                                    ></b-form-datepicker>
                                </b-input-group-append>
                            </b-input-group>
                        </div>
                        <div class="toolbar-field">
                            <strong>Date to</strong>
                            <b-input-group class="mb-3">
                                <b-form-input
                                    id="example-input"
                                    class="date-input"
                                    v-model="filters.date_to"
                                    type="text"
                                    placeholder="YYYY-MM-DD"
                                    autocomplete="off"
                                ></b-form-input>
                                <b-input-group-append>
                                    <b-form-datepicker
                                        v-model="filters.date_to"
                                        button-only
                                        right
                                        locale="en-US"
                                    ></b-form-datepicker>
                                </b-input-group-append>
                            </b-input-group>
                        </div>
                        <div class="toolbar-field">
                            <strong>Username</strong>
                            <b-input
                                type="text"
                                class="form-control"
                                id="search_key"
                                placeholder="Username"
                                v-model="filters.search_key"
                            />
                        </div>
                        <div class="toolbar-field">
                            <strong>&nbsp;</strong>
                            <button
                                class="btn btn-secondary"
                                @click.prevent="getList()"
                            >
                                Search
                            </button>
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
                            id="create"
                        >
                            <i class="fa fa-plus text-white"></i>
                            Add</b-button
                        >
                    </div>
                </div>
            </div>
            <div class="search-bar mt-5"></div>
            <b-table
                striped
                hover
                outlined
                :items="admin_data.list"
                :fields="fields"
            >
                <template #cell(name)="row">
                    {{ row.item.first_name + " " + row.item.last_name }}
                </template>
                <template #cell(status)="row">
                    <span
                        :class="`label label-${
                            row.item.status ? 'primary' : 'default'
                        }`"
                        >{{ row.item.status ? "Active" : "Inactive" }}</span
                    >
                </template>
                <template #cell(actions)="row">
                    <b-button
                        class="mb-0"
                        variant="-secondary"
                        size="sm"
                        pill
                        @click="showForm('edit', row.item)"
                    >
                        <i class="fa fa-fw"></i>
                    </b-button>
                    <b-button
                        class="mb-0"
                        variant="outline-secondary"
                        size="sm"
                        pill
                        @click="remove(row.item)"
                    >
                        <i class="fa fa-trash-o"></i>
                    </b-button>
                </template>
            </b-table>
            <div class="spacer-20"></div>
            <Pagination
                v-if="admin_data.list.length > 0"
                :data="admin_data"
                @emitpage="getList"
            />
        </div>

        <b-modal id="modal-form" centered size="lg" @hidden="reset()">
            <template #modal-header>
                <h5 class="modal-head-title">Add new admin</h5>
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
                                    :description="re.type"
                                >
                                    <b-form-select
                                        id="type"
                                        class="form-control"
                                        v-model="pl.type"
                                        :options="type_options"
                                        required
                                    ></b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group
                                    label="Email Address:"
                                    label-for="email"
                                    :description="re.email"
                                >
                                    <b-form-input
                                        id="email"
                                        v-model="pl.email"
                                        type="email"
                                        placeholder="Enter email address"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group
                                    label="First Name:"
                                    label-for="firstname"
                                    :description="re.first_name"
                                >
                                    <b-form-input
                                        id="firstname"
                                        v-model="pl.first_name"
                                        type="text"
                                        placeholder="Enter first name"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group
                                    label="Last Name:"
                                    label-for="lastname"
                                    :description="re.last_name"
                                >
                                    <b-form-input
                                        id="lastname"
                                        v-model="pl.last_name"
                                        type="text"
                                        placeholder="Enter last name"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group
                                    label="Username:"
                                    label-for="username"
                                    :description="re.username"
                                >
                                    <b-form-input
                                        id="username"
                                        v-model="pl.username"
                                        type="text"
                                        placeholder="Enter username"
                                        autocomplete="off"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group
                                    label="Password:"
                                    label-for="password"
                                    :description="re.password"
                                    v-show="mode != 'edit'"
                                >
                                    <b-form-input
                                        id="password"
                                        v-model="pl.password"
                                        type="password"
                                        placeholder="Enter password"
                                        autocomplete="new-password"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-form>
                </b-container>
            </template>
            <template #modal-footer>
                <button
                    class="btn btn-default"
                    @click="$bvModal.hide('modal-form')"
                >
                    Cancel
                </button>
                <button class="btn btn-success" @click.prevent="submit()">
                    Submit
                </button>
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
            mode: "",
            filters: {
                date_from: "",
                date_to: "",
                search_key: "",
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
                {
                    key: "last_login",
                    label: "Last Logged In",
                },
                "status",
                { key: "updated_by", label: "Updated By" },
                { key: "actions", label: "Actions" },
            ],
            type_options: [
                {
                    value: null,
                    text: "Select type",
                },
                {
                    value: 1,
                    text: "Master Admin",
                },
                {
                    value: 2,
                    text: "Admin",
                },

                // { value: "d", text: "This one is disabled", disabled: true },
            ],
            pl: {
                id: null,
                email: null,
                first_name: null,
                last_name: null,
                username: null,
                password: null,
                type: null,
            },
            re: {
                id: null,
                email: null,
                first_name: null,
                last_name: null,
                username: null,
                password: null,
                type: null,
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
        }),
        showForm(m, r) {
            var vm = this;
            vm.mode = m;
            if (m == "edit") {
                vm.pl.id = r.id;
                vm.pl.type = r.type;
                vm.pl.username = r.username;
                vm.pl.password = r.password;
                vm.pl.email = r.email;
                vm.pl.first_name = r.first_name;
                vm.pl.last_name = r.last_name;
            }

            vm.$bvModal.show("modal-form");
        },
        getList(n) {
            var vm = this;

            var pl = {
                page_no: n ? n : 1,
                limit: 50,
                sort_column: "created_at",
                sort_order: "desc",
            };

            // if (isReset) {
            //     vm.filters.search_key = "";
            //     vm.dateRangePicker = "";
            //     vm.filters.from = "";
            //     vm.filters.to = "";
            // }

            if (vm.filters.search_key) {
                pl.search_key = vm.filters.search_key;
            }

            // if (vm.filters.from && vm.filters.to && vm.filters.to) {
            //     pl.from = vm.filters.from;
            //     pl.to = vm.filters.to;
            // }

            vm.adminGetList(pl);
        },
        async submit() {
            var vm = this;
            const res = await vm.adminCreate(vm.pl);

            if (res.status == 422) {
                var e = res.data.errors;
                vm.re.type = e.type[0];
                vm.re.email = e.email[0];
                vm.re.first_name = e.first_name[0];
                vm.re.last_name = e.last_name[0];
                vm.re.username = e.username[0];
                vm.re.password = e.password[0];
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
            console.log("reset");
            var vm = this;
            vm.pl.id = null;
            vm.pl.type = null;
            vm.pl.email = null;
            vm.pl.first_name = null;
            vm.pl.last_name = null;
            vm.pl.username = null;
            vm.pl.password = null;

            vm.re.id = null;
            vm.re.type = null;
            vm.re.email = null;
            vm.re.first_name = null;
            vm.re.last_name = null;
            vm.re.username = null;
            vm.re.password = null;
        },
    },
    mounted() {
        this.getList(1);
    },
};
</script>

<style></style>
