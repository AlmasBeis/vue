<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();

    const isAuthPage = computed(() => {
      return route.path === '/login' || route.path === '/register';
    });

    return {
      isAuthPage,
    };
  },
};
</script>
