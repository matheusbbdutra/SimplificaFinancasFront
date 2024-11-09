export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie<string | null>('token').value;
    
    if (!token && !to.path.startsWith('/usuario/login') && !to.path.startsWith('/usuario/registrar')) {
        return navigateTo('/usuario/login');
    }
});
