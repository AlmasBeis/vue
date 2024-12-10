<template>
  <main id="main">
    <HeaderSection @toggle="handleToggle" />
    <Login v-if="store.isLoginPanel"/>
    <NuxtPage />
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '~/stores/auth'
import { useStore } from '~/stores/index'

const store = useStore();
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-image: url('@/assets/background.png'); /* Replace with the correct image path */
  background-size: cover; /* Ensures the image covers the entire viewport */
  background-position: center center; /* Centers the background image */
  background-repeat: no-repeat; /* Prevents the image from repeating */
  background-attachment: fixed; /* Keeps the background image fixed in one position */
  min-height: 100vh;
}</style>
