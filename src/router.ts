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
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "login" */ "./views/Login.vue")
  },
  {
    path: "/login/twitch",
    name: "loginTwitch",
    component: () =>
      import(/* webpackChunkName: "loginTwitch" */ "./views/LoginTwitch.vue")
  },
  {
    path: "/noaccess",
    name: "noaccess",
    component: () =>
      import(/* webpackChunkName: "noaccess" */ "./views/NoAccess.vue")
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
