<template>
    <div class="window">
        <div class="inner-padding">
            <button class="btn btn-primary" @click="$bvModal.show('modal-create')">Modal</button>
            <button class="btn btn-danger" @click="$swal('Alert!')">Sweet Alert</button>

            <table class="table table-bordered table-striped" id="tb1" data-rt-breakpoint="600">
                <thead>
                    <tr>
                        <th scope="col" data-rt-column="ID">ID</th>
                        <th scope="col" data-rt-column="Project">Project</th>
                        <th scope="col" data-rt-column="Status">Status</th>
                        <th scope="col" data-rt-column="Year" data-rt-hide="true">Year</th>
                        <th scope="col" data-rt-column="Progress">Progress</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>LP-402</td>
                        <td>Landings page</td>
                        <td>
                            <span class="label label-default">Acitve</span>
                        </td>
                        <td>2012</td>
                        <td>100%</td>
                    </tr>
                    <tr>
                        <td>PR-179</td>
                        <td>Project X</td>
                        <td>
                            <span class="label label-primary">Waiting</span>
                        </td>
                        <td>2013</td>
                        <td>21%</td>
                    </tr>
                    <tr>
                        <td>PR-181</td>
                        <td>Project Y</td>
                        <td>
                            <span class="label label-success">Aproven</span>
                        </td>
                        <td>2012</td>
                        <td>96%</td>
                    </tr>
                    <tr>
                        <td>BL-008</td>
                        <td>Blog Update</td>
                        <td>
                            <span class="label label-danger">Canceled</span>
                        </td>
                        <td>2013</td>
                        <td>100%</td>
                    </tr>
                    <tr>
                        <td>WB-008</td>
                        <td>New Website</td>
                        <td>
                            <span class="label label-warning">Pending</span>
                        </td>
                        <td>2013</td>
                        <td>99%</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <b-modal id="modal-create">
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
                <button class="btn btn-danger" @click="$bvModal.hide('modal-create')">Cancel</button>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    methods: {
        ddd() {
            
        }
    }
}
</script>

<style>
</style>