import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LandingPage from "../views/LandingPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Landing Page",
    component: LandingPage,
  },
  {
    path: "/auth/signup",
    name: "Sign Up",
    component: () => import("@/views/SignUp.vue"),
  },
  {
    path: "/auth/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Woofs.vue"),
  },
  {
    path: "/user/:handle",
    name: "User",
    component: () => import("@/views/User.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
