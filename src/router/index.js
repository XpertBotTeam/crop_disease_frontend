import { createWebHistory, createRouter } from "vue-router";
import AppHome from "@/components/AppHome.vue";
import AppLogin from "@/components/AppLogin.vue";
import AppRegister from "@/components/AppRegister.vue";
import UploadImage from "@/components/UploadImage.vue";
import Solution from "@/components/AppSolution.vue";
import UserProfile from "@/components/UserProfile.vue";

const routes = [
    {path: '/', name: 'Home', component: AppHome ,  meta: { requiresAuth: true } },
    {path: '/login', name: 'Login', component: AppLogin},
    {path: '/register', name: 'Register', component: AppRegister},
    {path: '/uploadImage', name: 'UploadImage', component: UploadImage ,  meta: { requiresAuth: true } },
    {path: '/solution', name: 'Solution', component: Solution ,  meta: { requiresAuth: true } },
    {path: '/userprofile', name: 'UserProfile', component: UserProfile ,  meta: { requiresAuth: true } },

]

const router = createRouter(
    {
        history: createWebHistory(),
        routes,
        linkActiveClass: "active"
    }
);

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("user-info"); // Check if the user is authenticated
  
    // If the route requires authentication and the user is not authenticated, redirect to the login page
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  });

export default router;