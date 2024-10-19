<script setup>
import { defineEmits } from '@vue/runtime-core';
const emit = defineEmits(["toggle", "filter"]);

const toggleClass = () => {
  emit("toggle");
};

const triggerFilter = (filter) => {
  emit("filter", filter);
};
</script>

<template>
  <div class="menu">
    <div class="row_1">
      <div @click="toggleClass" class="menu_1">MENU</div>
    </div>
    <div class="menu-cont-inner">
      <div @click="triggerFilter('Adventure')" class="menu-item">
        ADVENTURE BLOG
      </div>
      <div @click="triggerFilter('Music')" class="menu-item">MUSIC BLOG</div>
      <div @click="triggerFilter('Sports')" class="menu-item">
        SPORT BLOG
      </div>
      <div @click="triggerFilter('Seminar')" class="menu-item">Seminar BLOG</div>
      <div class="contacts">
        <div class="contacts-1">CONTACTS</div>
        <div class="contacts-item">PHONE: +1(234)-23-45-22</div>
        <div class="contacts-item">ADDRESS: Green st., Yalow park</div>
        <div class="contacts-item">EMAIL: Yallow@park.info</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu {
  width: 20%;
  background-color: rgba(193, 235, 241, 1);
  padding: 1rem;
  height: 100%;
  font-family: Jersey15;

}

.row_1 {
  display: flex;
  justify-content: center;
  width: 100%;
}

.menu_1 {
  background-color: rgba(255, 255, 255, 1);
  padding: 10px 0;
  font-size: 36px;
  line-height: 36px;
  font-weight: 600;
  color: rgba(97, 92, 92, 1);
  border-radius: 10px;
  text-align: center;
  width: 100%;
}

.menu_1:hover {
  transition: 0.4s;
  cursor: pointer;
}

.menu-cont-inner {
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  gap: 1.5rem;
  border-radius: 12px;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.menu-item {
  background: linear-gradient(
      to right,
      rgba(76, 216, 124, 1) 0%,
      rgba(66, 214, 105, 1) 50%,
      rgba(61, 213, 94, 1) 100%
  );
  width: 100%;
  display: flex;
  font-size: 36px;
  justify-content: left;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  color: rgba(255, 255, 255, 1);
  font-weight: 500;
}

.contacts-1 {
  text-align: center;
  font-size: 36px;
}

.contacts {
  background: linear-gradient(180deg, #AFF090 0%, #45C330 100%);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 12px;
  padding: 1rem;
  margin:10px;
  margin-top: 0.5rem;
  width: 90%;
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
}

.contacts-item {
  font-size: 20px;
}

.menu-item:hover {
  transition: 0.4s;
  cursor: pointer;
}

</style>