<template>
  <header>
      <nav v-if="isNavVisible">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
  </header>

  <!-- Main content area -->
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { ref } from 'vue'

// Add a state to control visibility of the navigation menu
const isNavVisible = ref(true)

// You could dynamically change `isNavVisible` based on screen size
const updateNavVisibility = () => {
  if (window.innerWidth <= 768) {
    isNavVisible.value = false // Hide nav on small screens
  } else {
    isNavVisible.value = true // Show nav on larger screens
  }
}

updateNavVisibility()

window.addEventListener('resize', updateNavVisibility)
</script>

<style scoped>
/* General header styling */
header {
  line-height: 1.5;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 10; /* Ensure it's on top */
  padding: 1rem 0; /* Add some padding to make it look better */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Optional shadow for better visibility */
}

/* Styling for the logo */
.logo {
  display: block;
  margin: 0 auto 2rem;
  width: 125px;
  height: 125px;
}

/* Wrapper for navigation */
.wrapper {
  width: 100%;
}

/* Navigation styling */
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

/* Active link styles */
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

/* Media queries for responsiveness */
@media (min-width: 1024px) {
  /* Header flex layout for larger screens */
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem;
  }
}

/* Make sure the body has enough padding to avoid overlap with fixed header */
body {
  padding-top: 150px; /* Adjust this based on header height */
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

/* Styling for RouterView (main content) */
RouterView {
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  flex-grow: 1; /* Ensures RouterView takes remaining space */
}
</style>

