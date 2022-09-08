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
                    <!-- <div class="toolbar-field">
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
                    </div> -->
                </div>
            </div>
            <div class="search-bar mt-5"></div>
            <b-table
                striped
                hover
                outlined
                :items="log_data.list"
                :fields="fields"
            >
                <template #cell(url)="row">
                    <div href="jdivvascript:void(0)" class="overflow-e">
                        {{ row.item.url }}
                    </div>
                </template>
            </b-table>
            <div class="spacer-20"></div>
            <Pagination
                v-if="log_data.list.length > 0"
                :data="log_data"
                @emitpage="getList"
            />
        </div>

        <b-modal id="modal-form" centered @hidden="reset()">
            <template #modal-header>
                <h5 class="modal-head-title">
                    {{ mode == "edit" ? "Edit" : "Add new" }} stream group
                </h5>
                <!-- <button class="close" @click="$bvModal.hide('modal-form')">×</button> -->
            </template>
            <template>
                <b-container fluid>
                    <!-- <b-form @submit="onSubmit" @reset="onReset"> -->

                    <b-form autocomplete="off" @submit.prevent="submit()">
                        <b-row>
                            <b-col>
                                <b-form-group
                                    label="Name:"
                                    label-for="name"
                                    :description="re.name"
                                >
                                    <b-form-input
                                        id="name"
                                        v-model="pl.name"
                                        type="text"
                                        placeholder="Enter name"
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
                { key: "username", label: "Username" },
                { key: "action", label: "Activity" },
                { key: "note", label: "Note" },
                { key: "created_at", label: "Created At" },
            ],
            pl: {
                id: null,
                name: null,
            },
            re: {
                id: null,
                name: null,
            },
        };
    },
    computed: {
        ...mapState("log", {
            log_data: "data",
        }),
    },
    methods: {
        ...mapActions("log", {
            logGetList: "getList",
            logGetOne: "getOne",
            logCreate: "create",
        }),
        showForm(m, r) {
            var vm = this;
            vm.mode = m;
            if (m == "edit") {
                vm.pl.id = r.id;
                vm.pl.name = r.name;
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

            vm.logGetList(pl);
        },
        async submit() {
            var vm = this;
            const res = await vm.logCreate(vm.pl);

            if (res.status == 422) {
                var e = res.data.errors;
                vm.re.id = e.id[0];
                vm.re.name = e.name[0];
            }
        },
        async remove(r) {
            var vm = this;
            vm.$swal({
                title: "Are you sure?",
                html: `This will <strong>delete</strong> ${r.name} from stream groups`,
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
            vm.pl.name = null;

            vm.re.id = null;
            vm.re.name = null;
        },
    },
    mounted() {
        this.getList(1);
    },
};
</script>

<style></style>
