
<script setup>
import { defineEmits } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
const router = useRouter();
const emit = defineEmits(["toggle"]);

const toggleClass = () => {
  emit("toggle");
}

const isDropdownOpen = ref(false);

// Function to toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Function to handle menu item clicks
const handleEvent = (event) => {
  console.log("handleEvent", event);
  if (event === 'Log'){
    router.push('/login');
  }else{
    router.push('/register');
  }

  isDropdownOpen.value = false;
};

</script>
<template>
  <header class="header">
    <img @click="toggleClass" src="@/assets/menu.svg" alt="Menu Icon" class="icon-image" />

    <div class="header-text">
      <p>New trips on Fall season! Full details on our Instagram accounts.</p>
    </div>

    <div class="header-icon">
      <img @click="toggleDropdown" src="@/assets/avatar.svg" alt="Profile Icon" class="avatar-icon" />
      <ul v-if="isDropdownOpen" class="dropdown-menu">
        <li @click="handleEvent('Log')">Log in</li>
        <li @click="handleEvent('Register')">Register</li>
      </ul>
    </div>
  </header>
</template>


<style scoped>
.dropdown-menu {
  position: absolute; /* Позиционируем меню абсолютно */
  top: 8%;
  left: 90%;
  width: 10%;
  font-family: Jersey15;
  background: white; /* Цвет фона для выпадающего меню */
  border: 1px solid #ccc; /* Граница для меню */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Тень для выпадающего меню */
  z-index: 1000; /* Убедитесь, что меню над основным контентом */
}

.dropdown-menu li {
  background-color: rgba(91, 185, 205, 1);
  font-size: 32px;
  font-weight: 400;
  padding: 10px; /* Отступы для пунктов меню */
  cursor: pointer; /* Курсор указателя при наведении */
}

.dropdown-menu li:hover {
  background: #f0f0f0; /* Эффект наведения */
}
.header {
  display: flex;
  font-family: Inknut Antiqua;
  font-size: 17px;
  font-weight: 400;
  line-height: 43.84px;
  text-align: left;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255,255,255,.8);
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-icon {
  width: 2.3em; /* Fixed size for icons */
  height: 2.3em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #7EEFFF;
  border-radius: 50%;
  flex-shrink: 0;
}

.icon-image {
  width: 2em; /* Size of the icon */
  height: 2em;
  cursor: pointer;
}

.avatar-icon {
  width: 1.7em;
  height: 1.7em;
}

.header-text {
  justify-content: center;
  width: 50vw;
  background: linear-gradient(90deg, #E5F67C 0%, #ECEF64 33%, #D2E037 66%, #EAEE3A 100%);
  font-size: 16px;
  font-weight: bold;
  align-items: center;
  display: flex;
  border-radius: 10px;
}

.header-text p {
  background:  linear-gradient(90deg, #FFADAD 0%, #FF774C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

}
</style>
