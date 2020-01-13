import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/login/callback",
        name: "loginCallback",
        component: () =>
            import(
                /* webpackChunkName: "loginCallback" */ "./views/LoginCallback.vue"
            )
    },
    {
        path: "/login/twitch",
        name: "loginTwitch",
        component: () =>
            import(
                /* webpackChunkName: "loginTwitch" */ "./views/LoginTwitch.vue"
            )
    },
    {
        path: "/logout",
        name: "logout",
        component: () =>
            import(/* webpackChunkName: "logout" */ "./views/Logout.vue")
    },
    {
        path: "/no-access",
        name: "noAccess",
        component: () =>
            import(/* webpackChunkName: "noAccess" */ "./views/NoAccess.vue")
    },
    {
        path: "/dashboard",
        name: "dashboard",
        component: () =>
            import(/* webpackChunkName: "dashboard" */ "./views/Dashboard.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
