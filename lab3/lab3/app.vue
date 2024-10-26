<template>
  <main id="main">
    <HeaderSection v-if="isAuthenticated" @toggle="handleToggle" />
    <NuxtPage />
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

const isMenuVisible = ref(false); // Local state to track side menu visibility
const isAuthenticated = computed(() => !!authStore.token)
// Get the current route
const route = useRoute();

// Function to toggle menu visibility
const handleToggle = () => {
  isMenuVisible.value = !isMenuVisible.value; // Toggle the visibility
};

provide('isMenuVisible', isMenuVisible);
provide('handleToggle', handleToggle);
</script>

<style>
/* Add your styles here */
</style>
