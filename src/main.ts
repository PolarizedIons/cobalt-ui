import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import btn from "./components/global/btn.vue";
import TokenService from "./services/TokenService";

Vue.config.productionTip = false;

// Global components
Vue.component("btn", btn);

Vue.prototype.$token = new TokenService();

const app = new Vue({
    router,
    data() {
        return {
            loggedIn: false
        };
    },
    mounted() {
        if (this.$token.isValid()) {
            this.loggedIn = true;
            // this.$token.refresh();
        }

        this.$token.startRefreshTimer();
    },
    render: h => h(App)
}).$mount("#app");

setInterval(() => {
    console.log("checking if still valid???");
    if (!app.$token.isValid()) {
        console.log("kicking out");
        app.loggedIn = false;
        app.$router.push({ name: "home" });
    }
}, 30000);
