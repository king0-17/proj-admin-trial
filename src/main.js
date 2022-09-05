import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

// import jQuery from 'jquery'

// global.jQuery = jQuery

import 'bootstrap'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'




// Stylesheets
import "./assets/karma/bootstrap/select2/select2.css";
import "./assets/karma/bootstrap/datepicker/css/datepicker.css";
import "./assets/karma/bootstrap/fileupload/bootstrap-fileupload.min.css";
import "./assets/karma/bootstrap/typeahead/typeahead.min.css";
import "./assets/karma/bootstrap/colorpicker/css/colorpicker.css";
import "./assets/karma/bootstrap/timepicker/css/bootstrap-timepicker.min.css";
import "./assets/karma/fontawesome/css/font-awesome.min.css";
import "./assets/karma/css/bootstrap-custom.css";
import "./assets/karma/css/bootstrap-extended.css";
import "./assets/karma/css/animate.min.css";
import "./assets/karma/css/helpers.css";
import "./assets/karma/css/base.css";
import "./assets/karma/css/light-theme.css";
import "./assets/karma/css/mediaqueries.css";

// // Helpers 
// // import "./assets/karma/js/plugins/modernizr.min.js"; 
// import "./assets/karma/js/plugins/mobiledevices.js";

// // jQuery core
// // import "./assets/karma/js/libs/jquery-1.11.0.min.js";
// import "./assets/karma/js/libs/jquery-ui-1.10.4.min.js";

// Bootstrap
// import "./assets/karma/bootstrap/core/dist/js/bootstrap.min.js";
import "./assets/karma/bootstrap/select2/select2.min.js";
import "./assets/karma/bootstrap/bootboxjs/bootboxjs.min.js";
import "./assets/karma/bootstrap/holder/holder.min.js";
import "./assets/karma/bootstrap/typeahead/typeahead.min.js";
import "./assets/karma/bootstrap/datepicker/js/bootstrap-datepicker.min.js";
import "./assets/karma/bootstrap/fileupload/bootstrap-fileupload.min.js";
import "./assets/karma/bootstrap/inputmask/bootstrap-inputmask.min.js";
import "./assets/karma/bootstrap/colorpicker/js/bootstrap-colorpicker.min.js";
import "./assets/karma/bootstrap/timepicker/js/bootstrap-timepicker.min.js";


// // import "./assets/karma/js/plugins/plugins.js";
// // import "./assets/karma/js/plugins/demo.js";
// // import "./assets/karma/js/plugins/main.js";  

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';

/**  VUE GLOBAL FUNCTIONS */
import './mixins'

Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')