<script lang="ts">
import {defineComponent} from 'vue'
import

export default defineComponent({
  name: "default"
})

// Get the current route
const route = useRoute();

// Function to toggle menu visibility
const handleToggle = () => {
  isMenuVisible.value = !isMenuVisible.value; // Toggle the visibility
};

provide('isMenuVisible', isMenuVisible);
provide('handleToggle', handleToggle);
</script>

<template>
  <div>
    <HeaderSection v-if="isAuthenticated" @toggle="handleToggle" />
  </div>
</template>

<style scoped>

</style>