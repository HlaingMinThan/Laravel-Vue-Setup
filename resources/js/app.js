import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./routes/index";
/**------- vue router setup --------- */
Vue.use(VueRouter);
const router = new VueRouter({
    routes,
    mode: "history"
});

/**------- axios setup--------- */
import axios from "axios";
window.axios = axios;
let baseUrl = window.location.origin;
axios.defaults.baseURL = baseUrl + "/api/";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

/**------- client auth setup with websonava--------- */
import auth from "@websanova/vue-auth/src/v2.js";
import driverAuthBearer from "@websanova/vue-auth/src/drivers/auth/bearer.js";
import driverHttpAxios from "@websanova/vue-auth/src/drivers/http/axios.1.x.js";
import driverRouterVueRouter from "@websanova/vue-auth/src/drivers/router/vue-router.2.x.js";
Vue.use(auth, {
    plugins: {
        http: axios,
        router
    },
    drivers: {
        auth: driverAuthBearer,
        http: driverHttpAxios,
        router: driverRouterVueRouter
    },
    options: {
        loginData: {
            url: "auth/login",
            method: "POST"
        },
        fetchData: {
            url: "auth/user",
            method: "GET"
        },
        refreshData: {
            url: "auth/refresh",
            method: "GET"
        },
        authRedirect: {
            path: "/admin/login"
        }
    }
});

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
