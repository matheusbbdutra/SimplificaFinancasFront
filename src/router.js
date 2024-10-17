import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './pages/DashboardPage.vue';
import Contas from './pages/ContasPage.vue';
import Login from './pages/LoginPage.vue';

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    {
        path: '/contas',
        component: Contas,
        meta: { requiresAuth: true }
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/login'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const isAuthenticated = sessionStorage.getItem('authToken') !== null;
        if (!isAuthenticated) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
