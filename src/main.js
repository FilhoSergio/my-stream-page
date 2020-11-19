import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Axios from "axios";
Vue.config.productionTip = false;

new Vue({
  vuetify,
  Axios,
  render: (h) => h(App),
}).$mount("#app");
