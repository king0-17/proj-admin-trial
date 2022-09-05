<template>
    <div class="window">
        <div class="inner-padding">
            <div>
                <div class="pull-left">
                    <form>
                        <!-- <div class="toolbar-field">
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
                    </div> -->
                        <div class="toolbar-field">
                            <strong>Username</strong>
                            <input
                                type="text"
                                class="form-control"
                                id="search_key"
                                placeholder="Search"
                            />
                        </div>
                        <div class="toolbar-field">
                            <strong>&nbsp;</strong>
                            <button
                                class="btn btn-primary"
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
                            @click="$bvModal.show('modal-create')"
                            id="create"
                        >
                            <i class="fa fa-plus text-white"></i>
                            Create</b-button
                        >
                    </div>
                </div>
            </div>
            <div class="search-bar mt-5"></div>
            <b-table
                striped
                hover
                outlined
                :items="user_data.list"
                :fields="fields"
            >
                <template #cell(actions)="row">
                    <!-- <b-button
                        size="sm"
                        @click="info(row.item, row.index, $event.target)"
                        class="mr-1"
                    >
                        Info modal
                    </b-button>
                    <b-button size="sm" @click="row.toggleDetails">
                        {{ row.detailsShowing ? "Hide" : "Show" }} Details
                    </b-button> -->
                    <b-button
                        class="mb-0"
                        variant="warning"
                        size="sm"
                        @click="$bvModal.show('modal-create')"
                    >
                        <i class="fa fa-fw text-white"></i>
                    </b-button>
                    <b-button
                        class="mb-0"
                        variant="danger"
                        size="sm"
                        @click="$swal('Delete this user?')"
                    >
                        <i class="fa fa-trash-o text-white"></i>
                    </b-button>
                </template>
            </b-table>
            <!-- <table
                class="table table-bordered table-striped"
                id="tb1"
                data-rt-breakpoint="600"
            >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th><a href="javascript:void(0)">Username</a></th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Last Logged In</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="r in user_data.list" :key="r.id">
                        <td>{{ r.firstname + " " + r.lastname }}</td>
                        <td>{{ r.username }}</td>
                        <td>{{ formatUserType(r.user_type_id) }}</td>
                        <td>
                            <span
                                :class="`label label-${
                                    r.status ? 'success' : 'danger'
                                }`"
                                >{{ r.status ? "Active" : "Inactive" }}</span
                            >
                        </td>
                        <td>{{ r.last_login }}</td>
                        <td>
                            <b-button
                                class="mb-0"
                                variant="warning"
                                size="sm"
                                @click="$bvModal.show('modal-create')"
                            >
                                <i class="fa fa-fw text-white"></i>
                            </b-button>
                            <b-button
                                class="mb-0"
                                variant="danger"
                                size="sm"
                                @click="$swal('Delete this user?')"
                            >
                                <i class="fa fa-trash-o text-white"></i>
                            </b-button>
                        </td>
                    </tr>
                </tbody>
            </table> -->
            <div class="spacer-20"></div>

            <Pagination
                v-if="user_data.list.length > 0"
                :data="user_data"
                @emitpage="getList"
            />
        </div>

        <b-modal id="modal-create" centered>
            <template #modal-header>
                <h4 class="modal-head-title">Create User</h4>
                <!-- <button class="close" @click="$bvModal.hide('modal-create')">×</button> -->
            </template>
            <div class="row">
                <div class="col-lg-4">
                    <label for="fcid-1">
                        Username:
                        <span class="asterisk">*</span>
                    </label>
                </div>
                <div class="col-lg-8 has-error">
                    <input
                        class="form-control required"
                        type="text"
                        placeholder="username"
                        id="fcid-1"
                    />
                </div>
            </div>
            <div class="spacer-10"></div>
            <div class="row">
                <div class="col-lg-4">
                    <label for="fcid-1">
                        Password:
                        <span class="asterisk">*</span>
                    </label>
                </div>
                <div class="col-lg-8 has-error">
                    <input
                        class="form-control required"
                        type="password"
                        placeholder="***********"
                        id="fcid-1"
                    />
                </div>
            </div>
            <div class="spacer-10"></div>
            <template #modal-footer>
                <button class="btn btn-success">Submit</button>
                <button
                    class="btn btn-danger"
                    @click="$bvModal.hide('modal-create')"
                >
                    Cancel
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
            filters: {
                date_from: "",
                date_to: "",
            },
            fields: [
                {
                    key: "fullnme",
                    label: "Name",
                    formatter: (value, key, item) => {
                        return item.firstname + " " + item.lastname;
                    },
                },
                { key: "username", label: "Username" },
                {
                    key: "user_type_id",
                    label: "Type",
                    formatter: (value, key, item) => {
                        return this.formatUserType(value);
                    },
                },

                "status",
                "last_login",
                { key: "actions", label: "Actions" },
            ],
        };
    },
    computed: {
        ...mapState("user", {
            user_data: "data",
        }),
    },
    methods: {
        ...mapActions("user", {
            usersGetList: "getList",
        }),
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

            // if (vm.filters.search_key) {
            //     pl.search_key = vm.filters.search_key;
            // }

            // if (vm.filters.from && vm.filters.to && vm.filters.to) {
            //     pl.from = vm.filters.from;
            //     pl.to = vm.filters.to;
            // }

            vm.usersGetList(pl);
        },
    },
    mounted() {
        this.getList(1);
    },
};
</script>

<style></style>
