
<script setup>
import { defineEmits } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import SideMenu from "~/components/SideMenu.vue";
import {posts} from "~/content/data.js";
import { useAuthStore } from '~/stores/auth'
import { useStore } from '~/stores/index';
import { usePostsStore } from '~/stores/posts';
const isAuthenticated = computed(() => !!authStore.token)
const dropdownRef = ref(null);
const avatarRef = ref(null);
const authStore = useAuthStore();
const store = useStore();
const router = useRouter();
const postsStore = usePostsStore();
const isDropdownOpen = computed(() => store.loginDropdownIsOpen);

const emit = defineEmits(["toggle"]);

const isMobile = inject('isMobile')

const toggleClass = () => {
  emit("toggle");
}
const toggleDropdown = () => {
  store.toggleLoginDropdown();
};

// Function to handle menu item clicks
const handleEvent = (event) => {
  console.log("handleEvent", event);
  if (event === 'Log'){
    store.toggleLoginPanel(); // Открываем/закрываем модальное окно
  }else if(event === 'Register') {
    router.push('/register');
  }
  else if (event === 'Profile'){
    router.push('/my-profile');
  }
  else if (event === 'Favorites'){
    handleFavourite();
    router.push('/');
  }
  else if (event === 'Logout'){
    authStore.logout();
    postsStore.changeTopic("Adventure");
    router.push('/');
  }

  store.toggleLoginDropdown();
};
// Function to handle clicks outside the dropdown
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target) && event.target !== avatarRef.value) {
    store.toggleLoginDropdown();
  }
};

const isMenuVisible = inject('isMenuVisible');

const handleFavourite = () => {
  store.toggleLoginDropdown();
  postsStore.changeTopic("Favourites");
}

const handleToggle = () => {
  isMenuVisible.value = !isMenuVisible.value;
};


// Add a click event listener to the document
onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('click', handleClickOutside);
});

</script>
<template>
  <header class="header">
    <img @click="toggleClass" src="@/assets/menu.svg" alt="Menu Icon" class="icon-image" />
    <SideMenu
        @toggle="handleToggle"
        class="menu-cont"
        :class="{ hidden: !isMenuVisible }"
        v-if="!isMobile"
    />
    <div class="header-text">
      <p>New trips on Fall season! Full details on our Instagram accounts.</p>
    </div>

    <div class="header-icon">
      <img @click="toggleDropdown" src="@/assets/avatar.svg" alt="Profile Icon" class="avatar-icon" ref="avatarRef"/>
      <ul ref="dropdownRef" v-if="isDropdownOpen" class="dropdown-menu">
        <li @click="handleEvent('Log')" v-if="!isAuthenticated">Log in</li>
        <li @click="handleEvent('Register')" v-if="!isAuthenticated">Register</li>
        <li @click="handleEvent('Profile')" v-if="isAuthenticated">Profile</li>
        <li @click="handleEvent('Favorites')" v-if="isAuthenticated">Favorites</li>
        <li @click="handleEvent('Logout')" v-if="isAuthenticated">Log out</li>
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
  list-style: none;
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

.hidden {
  transform: translateX(-150%);
}

.menu-cont {
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.5s ease;
  z-index: 1;
}

.header-text p {
  background:  linear-gradient(90deg, #FFADAD 0%, #FF774C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

}

/* Адаптация для мобильных устройств */
@media (max-width: 768px) {
  .header {
    display: flex;
    font-family: Inknut Antiqua;
    font-size: 1rem;
    font-weight: 400;
    line-height: 2rem;
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
    position: relative;
  }

  .icon-image {
    width: 2em; /* Size of the icon */
    display: none;
    height: 2em;
    cursor: pointer;
  }

  .avatar-icon {
    width: 1.7em;
    height: 1.7em;
  }

  .header-text{
    width: 70%;
  }
  .header-text p{
    white-space: nowrap; /* Текст в одну строку */
    overflow: hidden; /* Обрезать текст, который не помещается */
    text-overflow: ellipsis; /* Добавить многоточие */
    max-width: 100%; /* Установить максимальную ширину контейнера */
    font-size: 16px; /* Настройка размера шрифта */
    padding: 10px;
    box-sizing: border-box; /* Включает padding в расчет ширины */
    justify-content: left;
  }

  .hidden {
    transform: translateX(-150%);
  }

  .menu-cont {
    position: fixed;
    top: 0;
    left: 0;
    transition: transform 0.5s ease;
    z-index: 1;
  }

  .header-text p {
    background:  linear-gradient(90deg, #FFADAD 0%, #FF774C 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .dropdown-menu {
    position: absolute; /* Позиционирование относительно родителя */
    left: -6rem;
    top:2rem;
    list-style: none;
    z-index: 10; /* Чтобы меню перекрывало другие элементы */
    width: fit-content;
  }

  .dropdown-menu li {
    padding: 8px 12px;
    cursor: pointer;
    white-space: nowrap; /* Чтобы текст не переносился */
    text-align: left; /* Текст влево */
  }
}
</style>
