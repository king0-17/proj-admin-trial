<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li v-for="(l, index) of data.links" :key="index">
                <a
                    href="javascript:void(0)"
                    :class="`${l.active ? 'active' : ''} ${
                        l.label == '...' ? 'disabled' : ''
                    }`"
                    @click.prevent="emitpage(l.label)"
                    >{{
                        l.label.includes("Previous")
                            ? "‹"
                            : l.label.includes("Next")
                            ? "›"
                            : l.label
                    }}</a
                >
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: {
        data: { type: Object },
    },
    computed: {},
    methods: {
        emitpage(n) {
            if (n == "&laquo; Previous") {
                if (this.data.current_page > 1) {
                    this.$emit("emitpage", this.data.current_page - 1);
                }
            } else if (n == "Next &raquo;") {
                if (this.data.current_page < this.data.last_page) {
                    this.$emit("emitpage", this.data.current_page + 1);
                }
            } else {
                this.$emit("emitpage", parseInt(n));
            }
        },
    },
    mounted() {},
};
</script>

<style>
.pagination > li > a.active {
    color: #fff;
    border: 1px solid #111;
    background-image: linear-gradient(to bottom, #333333, #222222);
    box-shadow: none;
    pointer-events: none;
}
</style>
