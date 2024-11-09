import { AxiosInstance } from 'axios';

declare module 'vue/types/vue' {
    interface Vue {
        $axios: AxiosInstance;
    }
}

declare module '@nuxt/types' {
    interface NuxtAppOptions {
        $axios: AxiosInstance;
    }
    interface Context {
        $axios: AxiosInstance;
    }
}

declare module '#app' {
    interface NuxtApp {
        $axios: AxiosInstance;
    }
}
