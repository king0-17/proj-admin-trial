<template>
    <div class="window"  >
        <table class="table-bordered"  style="width: 50%">
            <tbody>
                <tr>
                    <td>VUE_APP_API_URL: {{ env.VUE_APP_API_URL }}</td>
                </tr>
                <tr>
                    <td>VUE_APP_SOCKET: {{ env.VUE_APP_SOCKET }}</td>
                </tr>
                <tr>
                    <td>
                        VUE_APP_WEBSOCKET_KEY: {{ env.VUE_APP_WEBSOCKET_KEY }}
                    </td>
                </tr>
                <tr>
                    <td>
                        VUE_APP_WEBSOCKET_SERVER:
                        {{ env.VUE_APP_WEBSOCKET_SERVER }}
                    </td>
                </tr>
                <tr>
                    <td>
                        VUE_APP_PUSHER_APP_KEY: {{ env.VUE_APP_PUSHER_APP_KEY }}
                    </td>
                </tr>
                <tr>
                    <td>
                        VUE_APP_PUSHER_APP_CLUSTER:
                        {{ env.VUE_APP_PUSHER_APP_CLUSTER }}
                    </td>
                </tr>
                <tr>
                    <td>VUE_APP_MODE: {{ env.VUE_APP_MODE }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(process.env.VUE_APP_SOCKET);
    },
    computed: {
        env() {
            return process.env;
        },
    },
};
</script>

<style></style>
