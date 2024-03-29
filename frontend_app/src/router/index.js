// src/router/index.js
import {createRouter, createWebHistory} from 'vue-router';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';
import Activate from '../views/Activate.vue';
import {useAuthStore} from '../store/authStore';

const routes = [
    {
        path: "/login",
        component: Login,
        beforeEnter: (to, from, next) => {
            const authStore = useAuthStore();
            if (authStore.isLoggedIn) {
                next('/profile');
            } else {
                next();
            }
        }
    },

    {
        path: "/link-login",
        component: Activate,
    },
    {
        path: "/profile",
        component: Profile,
        meta: {requiresAuth: true},
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/login",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.path !== '/link-login' && to.matched.some(record => record.meta.requiresAuth) && !authStore.isLoggedIn) {
        next({path: '/login'});
    } else {
        next();
    }
});

export default router;
