<template>
  <main id="main">
    <HeaderSection @toggle="handleToggle" />
    <Login v-if="store.isLoginPanel"/>
    <NuxtPage />
    <MobileFooter v-if="isMobile"></MobileFooter>
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
const isMobile = ref(window?.outerWidth <= 768)
provide('isMobile', isMobile);
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
  padding-bottom: 50px;
}

@font-face {
  font-family: 'Jersey15';
  src: url('@/fonts/Jersey15-Regular.ttf');
}

footer {
  position: fixed; /* Закрепляем футер */
  bottom: 0; /* Располагаем его внизу страницы */
  left: 0; /* По всей ширине окна */
  width: 100%; /* Растягиваем футер по ширине */
  background-color: #fff; /* Цвет фона */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); /* Тень над футером */
  padding: 10px 20px; /* Внутренние отступы */
  display: flex; /* Выровняем элементы внутри */
  justify-content: space-around; /* Равномерное распределение кнопок */
  align-items: center; /* Вертикальное центрирование кнопок */
  z-index: 1000; /* Устанавливаем высокий z-index, чтобы футер был выше других элементов */
}
</style>
