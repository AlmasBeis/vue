import { useAuthStore } from "~/stores/auth";
import { useStore } from "~/stores";

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useAuthStore();
    const configStore = useStore();
    const isAuthenticated = computed(() => userStore.user !== null);

    if (!isAuthenticated.value) {
        return navigateTo('/register');
    }
});
