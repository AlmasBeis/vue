<template>
  <main id="main">
    <HeaderSection :showBurger="showBurger" @toggle="handleToggle" />
    <NuxtPage />
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const isMenuVisible = ref(false); // Local state to track side menu visibility

// Get the current route
const route = useRoute();

// Determine if the current page is an authentication page (e.g., login or register)
const showBurger = computed(() => {
  return !(route.path === '/login' || route.path === '/register');
});

// Function to toggle menu visibility
const handleToggle = () => {
  isMenuVisible.value = !isMenuVisible.value; // Toggle the visibility
};

provide('isMenuVisible', isMenuVisible);
provide('handleToggle', handleToggle);
</script>

<style scoped>
/* Add your styles here */
</style>
