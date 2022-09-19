import Vue from 'vue'

Vue.mixin({
    methods: {
        formatDateFdY(val) {
            if (!val) {
                return ''
            }
            var date = new Date(val);
            return date.toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })

        },
        formatUserType(val) {
            var user_type
            switch (val) {
                case 1:
                    user_type = 'Admin Level III'
                    break;
                case 2:
                    user_type = 'Admin Level II'
                    break;
                case 3:
                    user_type = 'Admin Level I'
                    break;

                default:
                    break;
            }
            return user_type
        },
        formatUserStatus(val) {
            var status
            switch (val) {
                case 1:
                    status = 'Inactive'
                    break;
                case 2:
                    status = 'Active'
                    break;

                default:
                    break;
            }
            return status
        },
    },
})