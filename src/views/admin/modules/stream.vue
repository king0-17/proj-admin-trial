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
                        <b-button
                            variant="danger"
                            pill
                            @click="$bvModal.show('modal-toggle')"
                        >
                            <i class="fa fa-fa-move text-white"></i>
                            Control</b-button
                        >
                    </div>
                </div>
            </div>

            <div class="search-bar mt-5"></div>

            <b-table
                striped
                hover
                outlined
                :items="stream_data.list"
                :fields="fields"
            >
                <template #cell(url)="row">
                    <div href="jdivvascript:void(0)" class="overflow-e">
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
                    >
                        <i class="fa fa-power-off"></i>
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
                v-if="stream_data.list.length > 0"
                :data="stream_data"
                @emitpage="getList"
            />
        </div>

        <b-modal id="modal-form" centered @hidden="reset()">
            <template #modal-header>
                <h5 class="modal-head-title">
                    {{ mode == "edit" ? "Edit" : "Add new" }} stream
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
                                    :description="re.exp_number"
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
                            <b-col cols="9">
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
                            <b-col>
                                <b-form-group
                                    label="Hash:"
                                    label-for="hash"
                                    :description="re.hash"
                                >
                                    <b-form-input
                                        id="hash"
                                        v-model="pl.hash"
                                        type="password"
                                        placeholder="Enter hash"
                                        autocomplete="new-password"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="9">
                                <b-form-group
                                    label="Expiration:"
                                    label-for="Expiration"
                                    :description="re.exp_number"
                                >
                                    <b-form-input
                                        id="Expiration"
                                        v-model="pl.exp_number"
                                        type="number"
                                        placeholder="Enter Expiration"
                                        autocomplete="off"
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col>
                                <b-form-group
                                    label="Unit"
                                    label-for="Expiration"
                                    :description="re.exp_number"
                                >
                                    <b-form-select
                                        id="type"
                                        class="form-control"
                                        v-model="pl.exp_unit"
                                        :options="unit_options"
                                    ></b-form-select>
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

        <b-modal
            id="modal-toggle"
            centered
            size="sm"
            @hidden="reset()"
            hide-footer
            hide-header
        >
            <template #modal-header>
                <h5 class="modal-head-title">Toggle User Data</h5>
                <!-- <button class="close" @click="$bvModal.hide('modal-toggle')">×</button> -->
            </template>
            <template>
                <div class="toggle-options">
                    <b-form-checkbox v-model="auto_position"
                        >Position Auto</b-form-checkbox
                    >
                    <b-form-input
                        id="color"
                        type="color"
                        v-model="toggle_color"
                    ></b-form-input>
                </div>
                <div class="toggle-positions mt-2">
                    <b-button
                        @click="selectPostion(5)"
                        :disabled="auto_position"
                        block
                        :variant="toggle_position == 5 ? 'dark' : 'default'"
                        style="height: 50px"
                    >
                        Top Left</b-button
                    >
                    <b-button
                        @click="selectPostion(1)"
                        :disabled="auto_position"
                        block
                        :variant="toggle_position == 1 ? 'dark' : 'default'"
                        style="height: 50px"
                    >
                        Top</b-button
                    >
                    <b-button
                        @click="selectPostion(6)"
                        :disabled="auto_position"
                        block
                        :variant="toggle_position == 6 ? 'dark' : 'default'"
                        style="height: 50px"
                    >
                        Top Right</b-button
                    >
                    <b-button
                        @click="selectPostion(3)"
                        :disabled="auto_position"
                        block
                        :variant="toggle_position == 3 ? 'dark' : 'default'"
                        style="height: 50px"
                    >
                        Left</b-button
                    >
                    <b-button
                        @click="selectPostion(0)"
                        :disabled="auto_position"
                        block
                        variant="default"
                        style="height: 50px"
                    >
                        Center</b-button
                    >
                    <b-button
                        @click="selectPostion(4)"
                        :disabled="auto_position"
                        block
                        :variant="toggle_position == 4 ? 'dark' : 'default'"
                        style="height: 50px"
                    >
                        Right</b-button
                    >
                    <b-button
                        @click="selectPostion(7)"
                        :disabled="auto_position"
                        block
                        :variant="toggle_position == 7 ? 'dark' : 'default'"
                        style="height: 50px"
                    >
                        Bottom Left</b-button
                    >
                    <b-button
                        @click="selectPostion(2)"
                        :disabled="auto_position"
                        block
                        :variant="toggle_position == 2 ? 'dark' : 'default'"
                        style="height: 50px"
                    >
                        Bottom</b-button
                    >
                    <b-button
                        @click="selectPostion(8)"
                        :disabled="auto_position"
                        block
                        :variant="toggle_position == 8 ? 'dark' : 'default'"
                        style="height: 50px"
                    >
                        Bottom Right</b-button
                    >
                </div>

                <div class="spacer-15"></div>

                <div style="width: 100%">
                    <b-button
                        pi
                        variant="primary"
                        style="height: 50px"
                        class="w-100"
                    >
                        Show</b-button
                    >
                    <b-button
                        pi
                        variant="default"
                        style="height: 50px"
                        class="w-100"
                    >
                        Hide</b-button
                    >
                </div>
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
                { key: "name", label: "Name" },
                { key: "url", label: "URL" },
                { key: "hash", label: "Hash" },
                {
                    key: "exp_number",
                    label: "Expiration",
                    formatter: (value, key, item) => {
                        return (
                            value +
                            " " +
                            (item.exp_unit == "h"
                                ? "Hours"
                                : item.exp_unit == "m"
                                ? "Minutes"
                                : item.exp_unit == "s"
                                ? "Seconds"
                                : "")
                        );
                    },
                },

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
            auto_position: true,
            toggle_color: "#FFFFFF",
            toggle_position: 0,
            toggle_options: [
                {
                    value: 1,
                    text: "Top",
                },
                {
                    value: 2,
                    text: "Bottom",
                },
                {
                    value: 3,
                    text: "Left",
                },
                {
                    value: 4,
                    text: "Right",
                },
                {
                    value: 5,
                    text: "Top Left",
                },
                {
                    value: 6,
                    text: "Top Right",
                },
                {
                    value: 7,
                    text: "Bottom Left",
                },
                {
                    value: 8,
                    text: "Bottom Right",
                },
            ],

            pl: {
                id: null,
                stream_group_id: null,
                name: null,
                url: null,
                hash: null,
                exp_number: null,
                exp_unit: null,
            },
            re: {
                id: null,
                stream_group_id: null,
                name: null,
                url: null,
                hash: null,
                exp_number: null,
                exp_unit: null,
            },
        };
    },
    computed: {
        ...mapState("stream", {
            stream_data: "data",
        }),
    },
    methods: {
        ...mapActions("stream", {
            streamGetList: "getList",
            streamGetOne: "getOne",
            streamCreate: "create",
        }),
        selectPostion(val) {
            this.toggle_position = val;
        },
        showForm(m, r) {
            var vm = this;
            vm.mode = m;
            if (m == "edit") {
                vm.pl.id = r.id;
                vm.pl.name = r.name;
                vm.pl.url = r.url;
                vm.pl.hash = r.hash;
                vm.pl.exp_number = r.exp_number;
                vm.pl.exp_unit = r.exp_unit;
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

            vm.streamGetList(pl);
        },
        async submit() {
            var vm = this;
            const res = await vm.streamCreate(vm.pl);

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
                html: `This will <strong>delete</strong> ${r.name} from streams`,
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
.toggle-positions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1em;
    margin: 1em 0;
}

.toggle-options {
    display: grid;
    grid-template-columns: 4fr 1fr;
}

.custom-control {
    padding: 0 !important;
}
.custom-control-label {
    margin-left: 5px;
    font-size: 15px !important;
}
</style>
