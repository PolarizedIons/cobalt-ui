import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import btn from "./components/global/btn.vue";

Vue.config.productionTip = false;

Vue.component("btn", btn);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
