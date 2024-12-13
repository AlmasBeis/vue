<script setup>
import {usePostsStore} from "~/stores/posts.js";
import {defineEmits} from "@vue/runtime-core";
import {useRouter} from "#vue-router";

const postsStore = usePostsStore();
const cardStore = usePostsStore();
const store = useStore();
const isMobile = inject('isMobile');
const isMenuVisible = inject('isMenuVisible');
const isDropdownOpen = computed(() => store.loginDropdownIsOpen);
const handleFavourite = () => {
  store.toggleLoginDropdown();
  router.push('/');
  handleToggle();
  postsStore.changeTopic("Favourites");
}

const router = useRouter();

const triggerFilter = (filter) => {
  cardStore.changeTopic(filter);
  cardStore.resetPage();
  handleToggle();
  router.push('/');

};

const handleToggle = () => {
  isMenuVisible.value = !isMenuVisible.value;
};

</script>

<template>
  <div class="categories"    :class="{ hidden: !isMenuVisible }"
  >
    <div class="category-item" @click="triggerFilter('Adventure')">
      <img src="E:\Учеба\7_sem\vue\lab3\lab3\assets\adventure-icon.png" alt="Adventure" />
      <span>ADVENTURE</span>
    </div>
    <div class="category-item" @click="triggerFilter('Music')">
      <img src="E:\Учеба\7_sem\vue\lab3\lab3\assets\nature-icon.png" alt="Nature" />
      <span>Nature</span>
    </div>
    <div class="category-item" @click="triggerFilter('Sports')">
      <img src="E:\Учеба\7_sem\vue\lab3\lab3\assets\fashion-icon.png" alt="Fashion" />
      <span>Fashion</span>
    </div>
    <div class="category-item" @click="triggerFilter('Seminar')">
      <img src="E:\Учеба\7_sem\vue\lab3\lab3\assets\modern-icon.png" alt="Modern" />
      <span>Modern</span>
    </div>
    <!-- Add more category items as needed -->
  </div>
<footer class="footer">
  <button class="icon-btn">
    <img src="E:\Учеба\7_sem\vue\lab3\lab3\assets\chat-icon.png" alt="Chat" />
  </button>
  <button class="icon-btn" @click="handleToggle">
    <img src="E:\Учеба\7_sem\vue\lab3\lab3\assets\grid-icon.png" alt="Grid" />
  </button>
  <button class="icon-btn" @click="handleFavourite">
    <img src="E:\Учеба\7_sem\vue\lab3\lab3\assets\heart-icon.png" alt="Heart" />
  </button>
</footer>
</template>

<style scoped>
.categories {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 20px 20px 70px 20px;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #a1c25e;
  transition: transform 0.5s ease;
  z-index: 1;
}

.hidden {
  transform: translateY(150%);
}


.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.category-item img {
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
}

.category-item span {
  font-size: 14px;
  font-weight: bold;
  color: #3a3a3a;
}

.category-item:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
}

/* Футер */
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  background: #a1c25e;
  border-top: 2px solid rgba(255, 255, 255, 0.6);
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.icon-btn img {
  width: 24px;
  height: 24px;
}

.icon-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>