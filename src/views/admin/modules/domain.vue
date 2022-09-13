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
                            <strong>Name</strong>
                            <b-input
                                type="text"
                                class="form-control"
                                id="search_key"
                                placeholder="Name"
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
                :items="domain_data.list"
                :fields="fields"
            >
                <template #cell(url)="row">
                    <div class="overflow-e">
                        {{ row.item.url }}
                    </div>
                </template>
                <template #cell(image)="row">
                    <a href="javascript:void(0)" class="overflow-e">
                        {{ row.item.image }}
                    </a>
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
                        Edit
                    </b-button>
                    <!-- <b-button
                        class="mb-0"
                        variant="outline-secondary"
                        size="sm"
                        pill
                    >
                        <i class="fa fa-power-off"></i>
                    </b-button> -->
                    <b-button
                        class="mb-0"
                        variant="outline-secondary"
                        size="sm"
                        pill
                        @click="remove(row.item)"
                    >
                        Delete
                    </b-button>
                    <b-button
                        class="mb-0"
                        variant="outline-secondary"
                        size="sm"
                        pill
                        @click="showStreams(row.item)"
                    >
                        View Streams
                    </b-button>
                </template>
            </b-table>
            <div class="spacer-20"></div>
            <Pagination
                v-if="domain_data.list.length > 0"
                :data="domain_data"
                @emitpage="getList"
            />
        </div>

        <b-modal id="modal-form" centered @hidden="reset()">
            <template #modal-header>
                <h5 class="modal-head-title">
                    {{ mode == "edit" ? "Edit" : "Add new" }} domain
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
                                    label="Stream Group"
                                    label-for="stream-group"
                                >
                                    <b-form-select
                                        id="stream-group"
                                        class="form-control"
                                        v-model="pl.stream_group_id"
                                        :options="group_options"
                                    ></b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-row>
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
                        <b-row>
                            <b-col>
                                <b-form-group
                                    label="URL:"
                                    label-for="url"
                                    :description="re.url"
                                >
                                    <b-form-input
                                        id="url"
                                        v-model="pl.url"
                                        type="text"
                                        placeholder="Enter URL"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-form-group
                                    label="Image:"
                                    label-for="image"
                                    :description="re.url"
                                >
                                    <b-form-input
                                        id="image"
                                        v-model="pl.image"
                                        type="text"
                                        placeholder="Enter image"
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
        <b-modal id="modal-stream-list" centered size="xl" scrollable>
            <template #modal-header>
                <h5 class="modal-head-title">View Streams</h5>
            </template>
            <template>
                <b-table striped hover outlined :items="stream_list">
                    <template #cell(url)="row">
                        <div class="overflow-e">
                            {{ row.item.url }}
                        </div>
                    </template>
                    <template #cell(status)="row">
                        <span
                            :class="`label label-${
                                row.item.status ? 'primary' : 'default'
                            }`"
                            >{{ row.item.status ? "Active" : "Inactive" }}</span
                        >
                    </template>
                </b-table>
            </template>

            <!-- <template #modal-footer>
                <button
                    class="btn btn-default"
                    @click="$bvModal.hide('modal-stream-list')"
                >
                    Cancel
                </button>
                <button class="btn btn-success" @click.prevent="submit()">
                    Submit
                </button>
            </template> -->
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
                { key: "name", label: "Name" },
                { key: "url", label: "URL" },
                { key: "image", label: "Image" },

                { key: "status", label: "Status" },
                { key: "updated_by", label: "Updated By" },

                { key: "actions", label: "Actions" },
            ],
            unit_options: [
                {
                    value: null,
                    text: "Select unit",
                },
                {
                    value: "h",
                    text: "Hours",
                },
                {
                    value: "m",
                    text: "Minutes",
                },
                {
                    value: "s",
                    text: "Seconds",
                },

                // { value: "d", text: "This one is disabled", disabled: true },
            ],
            group_options: [
                {
                    value: null,
                    text: "Select stream group",
                },
                {
                    value: 1,
                    text: "Stream Group 1",
                },
                {
                    value: 2,
                    text: "Stream Group 2",
                },
            ],
            stream_options: [
                {
                    value: null,
                    text: "Select stream",
                    selected: true,
                },
                {
                    value: 1,
                    text: "Stream 1",
                },
                {
                    value: 2,
                    text: "Stream 2",
                },
                {
                    value: 3,
                    text: "Stream 3",
                },
                {
                    value: 4,
                    text: "Stream 4",
                },
                {
                    value: 5,
                    text: "Stream 5",
                },
            ],
            stream_list: [
                {
                    name: "Stream-01",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 0,
                },
                {
                    name: "Stream-03",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 0,
                },
                {
                    name: "Stream-03",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 1,
                },
                {
                    name: "Stream-04",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 1,
                },
                {
                    name: "Stream-01",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 0,
                },
                {
                    name: "Stream-03",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 0,
                },
                {
                    name: "Stream-03",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 1,
                },
                {
                    name: "Stream-04",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 1,
                },
                {
                    name: "Stream-01",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 0,
                },
                {
                    name: "Stream-03",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 0,
                },
                {
                    name: "Stream-03",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 1,
                },
                {
                    name: "Stream-04",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 1,
                },
                {
                    name: "Stream-03",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 0,
                },
                {
                    name: "Stream-03",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 1,
                },
                {
                    name: "Stream-04",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 1,
                },
                {
                    name: "Stream-03",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 0,
                },
                {
                    name: "Stream-03",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 1,
                },
                {
                    name: "Stream-04",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 1,
                },
                {
                    name: "Stream-03",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 0,
                },
                {
                    name: "Stream-03",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 1,
                },
                {
                    name: "Stream-04",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 1,
                },
                {
                    name: "Stream-01",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 0,
                },
                {
                    name: "Stream-03",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 0,
                },
                {
                    name: "Stream-03",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 1,
                },
                {
                    name: "Stream-04",
                    url: "https://sample.stream2312jnqewj109823u203u102312231.23213/",
                    hash: "xhd8es0dj",
                    status: 1,
                },
            ],
            pl: {
                id: null,
                name: null,
                url: null,
                image: null,
                stream_group_id: null,
            },
            re: {
                id: null,
                name: null,
                url: null,
                image: null,
                stream_group_id: null,
            },
        };
    },
    computed: {
        ...mapState("domain", {
            domain_data: "data",
        }),
    },
    methods: {
        ...mapActions("domain", {
            domainGetList: "getList",
            domainGetOne: "getOne",
            domainCreate: "create",
        }),
        showForm(m, r) {
            var vm = this;
            vm.mode = m;
            if (m == "edit") {
                vm.pl.id = r.id;
                vm.pl.name = r.name;
                vm.pl.url = r.url;
                vm.pl.image = r.image;
                vm.pl.stream_group_id = r.stream_group_id;
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

            vm.domainGetList(pl);
        },
        async submit() {
            var vm = this;
            const res = await vm.domainCreate(vm.pl);

            if (res.status == 422) {
                var e = res.data.errors;

                vm.re.id = e.id[0];
                vm.re.name = e.name[0];
                vm.re.url = e.url[0];
                vm.re.hash = e.hash[0];
                vm.re.exp_number = e.exp_number[0];
                vm.re.exp_unit = e.exp_unit[0];
                vm.re.stream_group_id = e.stream_group_id[0];
            }
        },
        async remove(r) {
            var vm = this;
            vm.$swal({
                title: "Are you sure?",
                html: `This will <strong>delete</strong> ${r.name} from domains`,
                type: "warning",
                showCancelButton: true,
                padding: "2em",
            }).then((result) => {
                return result.isConfirmed;
            });
        },
        async showStreams() {
            var vm = this;
            vm.$bvModal.show("modal-stream-list");
        },
        reset() {
            var vm = this;

            vm.pl.id = null;
            vm.pl.name = null;
            vm.pl.url = null;
            vm.pl.hash = null;
            vm.pl.exp_number = null;
            vm.pl.exp_unit = null;
            vm.pl.stream_group_id = null;

            vm.re.id = null;
            vm.re.name = null;
            vm.re.url = null;
            vm.re.hash = null;
            vm.re.exp_number = null;
            vm.re.exp_unit = null;
            vm.re.stream_group_id = null;
        },
    },
    mounted() {
        this.getList(1);
    },
};
</script>

<style>
#modal-stream-list .modal-body {
    /* max-height: 500px; */
    /* overflow-y: auto; */
}
</style>
