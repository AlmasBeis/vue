<script setup>
import { ref } from "vue";
import {peopleData} from '@/data.js';
import HeaderSection from "@/components/HeaderSection.vue";
import SideMenu from "@/components/SideMenu.vue";

const isMenuVisible = ref(false);

const list = ref();

const init = () => {
  list.value = peopleData.filter((item) => item.Topic == "Adventure");
};

const topic = ref("Adventure");

init();

const handleToggle = () => {
  console.log("toggle");
  isMenuVisible.value = !isMenuVisible.value;
};

const handleFilter = (filter) => {
  list.value = peopleData.filter((item) => item.Topic == filter);
  isMenuVisible.value = !isMenuVisible.value;
  topic.value = filter;
};
</script>


<template>
  <div class="main-container">
    <HeaderSection @toggle="handleToggle"/>

    <!-- Filter Buttons -->

    <!-- Display Cards -->
    <div class="content">
      <div class="flexer">
        <div class="flexer_date">
          <div class="flexer_dater">13.09.2024</div>
        </div>
        <div class="flexer_topic">
          <div class="flexer_topic_name">{{ topic }}</div>
          <div class="sorter">
            <div><img :src="unknown" alt=""/></div>
            <div class="rating">Rating</div>
            <div><img :src="triangle" alt=""/></div>
          </div>
          <div class="arrow">
            <div class="arrow-cont">
              <img :src="arrow" alt=""/>
            </div>
            <div class="pagin">1/5</div>
          </div>
        </div>
        <div class="cards">
        </div>
      </div>
      <div class="ff">
        <div class="flexer2"></div>
        <div class="flexer3"></div>
      </div>
    </div>

    <div class="card" v-for="person in filteredPeople" :key="person.id">
      <img :src="person.Avatar" alt="Avatar" class="avatar"/>
      <div>
        <h4>{{ person.PersonName }}</h4>
        <p>{{ formatDate(person.PubDate) }}</p>
        <p>Rating: {{ person.Rating }}</p>
        <p>{{ person.Commentary }}</p>
      </div>
    </div>
    <SideMenu
        @toggle="handleToggle"
        @filter="handleFilter"
        class="menu-cont"
        :class="{ hidden: !isMenuVisible }"
    />
  </div>
</template>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
}

.hidden {
  transform: translateX(-150%);
}

.content {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 1rem;
  padding: 0 8rem;
}

.menu-cont {
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.5s ease;
}

.flexer {
  margin-top: 2rem;
  position: relative;
  background: linear-gradient(180deg, rgba(254, 254, 254, 0.8), rgba(184, 187, 187, 0.8) 100%);
  width: 70rem;
  height: 35rem;
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
  width: 100%;
  height: 100%;
  padding-top: 10px;
  background-image: url("@/assets/background.png");
  display: flex;
  flex-direction: column;
  background-position: center; /* Added this property */
  background-size: cover;
  background-repeat: no-repeat; /* Added this property */
}

.card {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  padding: 15px;
  align-items: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
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