import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./routes/index";

import axios from "axios";
window.axios = axios;

Vue.use(VueRouter);
const router = new VueRouter({
    routes,
    mode: "history"
});

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
