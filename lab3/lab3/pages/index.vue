<script setup>
import { computed, ref } from 'vue';
import { usePostsStore } from '@/stores/posts';
import { useAuthStore } from '@/stores/auth';
import triangle from '@/assets/triangle.svg';
import filter from '@/assets/filter.svg';
import HeaderSection from "@/components/HeaderSection.vue";
import SideMenu from "@/components/SideMenu.vue";
import Card from '@/components/PeopleCard.vue';
import arrow from '@/assets/Arrow.svg';

// Подключение Pinia-сторов
const postsStore = usePostsStore();
const authStore = useAuthStore();

// Локальное состояние
const isDropdownOpen = ref(false);

// Геттеры
const paginatedList = computed(() => postsStore.paginatedCards(4));
const currentPage = computed(() => postsStore.currentPage);
const totalPages = computed(() => postsStore.totalPages(4));
const sortByKey = computed(() => postsStore.currentSorting);
const topic = computed(() => postsStore.currentTitle);

// Функции
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const handleSort = (key) => {
  postsStore.changeSorting(key);
  isDropdownOpen.value = false;
};

const handleNextPage = () => {
  if (postsStore.currentPage < postsStore.totalPages(4)) {
    postsStore.nextPage(4);
  } else {
    postsStore.currentPage = 1; // Сбрасываем на первую страницу
  }
};

const updateRating = (id, newRating) => {
  const card = postsStore.getById(id);
  if (card) {
    card.Rating = newRating;
  }
};
</script>


<template>
  <div class="main-container">
    <div class="content">
      <div class="flexer">
        <div class="date-cont">
          <div class="date">13.09.2024</div>
        </div>
        <div class="topic">
          <div class="topic-name">{{ topic }}</div>
          <div class="category-filter">
            <img :src="filter" alt="Filter Icon"/>
            <div class="rating">{{ sortByKey }}</div>
            <img class="triangle" @click="toggleDropdown" :src="triangle" alt="Dropdown Icon"/>
            <ul v-if="isDropdownOpen" class="dropdown-menu">
              <li @click="handleSort('Rating')">Sort by Rating</li>
              <li @click="handleSort('Date')">Sort by Date</li>
            </ul>
          </div>

          <!-- Dropdown menu -->

          <div class="arrow">
            <div @click="handleNextPage" class="arrow-cont">
              <img :src="arrow" alt=""/>
            </div>
            <div class="pagin">{{ currentPage }}/{{ totalPages }}</div>
          </div>
        </div>
        <div class="cards">
          <Card
                v-for="person in paginatedList"
                :key="person.id"
                :id="person.id"
                :user-id="person.userId"
                :name="person.PersonName"
                :avatar="person.Avatar"
                :pubDate="person.PubDate"
                :comment="person.Commentary"
                :rating="person.Rating"
          />
        </div>
      </div>
      <div class="ff">
        <div class="flexer2"></div>
        <div class="flexer3"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>


.date-cont {
  display: flex;
  margin: 10px;
}

.date {
  background-color: rgba(91, 185, 205, 1);
  padding: 0 1rem;
  border-radius: 8px;
  font-family: 'Inknut Antiqua';
  font-size: 36px;
  line-height: 42.84px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 0px 2px 2px rgba(91, 185, 205, 1);
}

.category-filter {
  height: fit-content;
  background-color: rgba(238, 252, 247, 1);
  justify-content: space-between;
  padding: 0 1rem;
  align-items: center;
  gap: 15px;
  position: relative;
  display: inline-flex;
}

.dropdown-menu {
  position: absolute;
  top: 100%; /* Position the dropdown below the filter */
  left: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 0;
  list-style-type: none;
  width: 100%; /* Match the width of the filter button */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100; /* Ensure the dropdown appears above other elements */
}

.dropdown-menu li {
  padding: 10px 15px;
  cursor: pointer;
  background-color: #fff;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}

.dropdown-menu li:active {
  background-color: #e0e0e0;
}


.rating {
  font-size: 36px;
  color: #1DE390;
}
@font-face {
  font-family: 'Inknut Antiqua';
  src: url('@/fonts/InknutAntiqua-Regular.ttf');
}

.triangle {
  cursor: pointer;
}


@font-face {
  font-family: 'Italianno';
  src: url('@/fonts/Italianno-Regular.ttf');
}

.arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
}

.pagin {
  font-family: Italianno;
  font-size: 48px;
  color: white;
}

.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
  padding: 0 8rem;
}


.topic {
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  font-family: "Jersey15";
  align-items: center;
}

@font-face {
  font-family: 'Jersey15';
  src: url('@/fonts/Jersey15-Regular.ttf');
}

.topic-name {
  margin: 10px;
  background-color: rgba(91, 185, 205, 1);
  padding: 0 3rem;
  font-size: 64px;
  line-height: 42.84px;
  font-weight: 400;
  color: white;
  border-radius: 10px;
}

.cards {
  margin-top: 4rem;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 4rem;
  justify-content: center;
}


.flexer {
  margin-top: 2rem;
  position: relative;
  background: linear-gradient(180deg, rgba(254, 254, 254, 0.8), rgba(184, 187, 187, 0.8) 100%);
  width: 70rem;
  height: auto;
}

.flexer::before {
  content: "";
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 35rem solid transparent;
  border-right: 35rem solid transparent;
  border-bottom: 20px solid rgba(254, 254, 254, 0.8);
}

.ff {
  display: flex;
}

.flexer2 {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 20px 35rem 0 0;
  border-color: rgba(184, 187, 187, 0.8) transparent;
}

.flexer3 {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 20px 0px 0px 35rem;
  border-color: rgba(184, 187, 187, 0.8) transparent;
}

.main-container {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
}

button {
  margin-right: 10px;
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>