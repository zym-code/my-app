import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/home.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/login/login.vue"),
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router

