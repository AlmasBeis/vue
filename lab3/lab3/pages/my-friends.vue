<template>
  <div class="back">
    <div class="wraper">
      <p class="big">Friends</p>
      <div class="info" v-if="favorites.length === 0">You have no friends yet :(</div>
      <FriendCard v-for="user in favorites" :key=user.id :id="user.id" :usage="id"></FriendCard>
      <div>
        <div v-if="total_pages!==0" class="aligh-right">
          <button @click="prevPage"><img class="left-arrow" src="assets/triangle.svg" /></button>
          <p> {{ current_page }}/{{ total_pages }} </p>
          <button @click="nextPage"><img class="right-arrow" src="assets/triangle.svg" /></button>
        </div>
      </div>
    </div>
  </div>

</template>


<script setup>

import FriendCard from '~/components/FriendCard.vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute()

const userStore = useAuthStore();
const id = Number(userStore.user.id);


const current_page = ref(1);

const favorites = computed(() => {
  return userStore.paginatedFavorites(4, -1, current_page.value);
});

const total_pages = computed(()=> {
  return Math.ceil(userStore.getFavorites(-1).length / 4);
});

function nextPage() {
  if (current_page.value < total_pages.value)
    current_page.value += 1;
}

function prevPage() {
  if (current_page.value > 1)
    current_page.value -= 1;
}

definePageMeta({
  middleware: 'auth',
});


</script>


<style scoped>

.back {
  position: absolute;
  font-family: 'Inknut Antiqua';
  z-index: 0;
  left: 0;
  height: fit-content;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  background: linear-gradient(to bottom, #adebff, #f7e3e8);
  background-attachment: fixed;
}

.info {
  display: flex;
  justify-content: center;
}



.wraper {
  margin: 5% 10%;
  display: flex;
  flex-direction: column;
}

.profile-info img{
  width: 15%;
}


.control button {
  font-family: 'Inknut Antiqua';
  font-size: 2.5em;
  width: 100%;
  min-width: 200px;
  margin: 10px;
}

.big {
  font-family: 'Inknut Antiqua';
  padding-right: 100px;
  text-align: right;
  color: white;
  font-size: 4em;
}

.aligh-right {
  display: flex;
  flex-direction: row;
  float: right;
  padding: 10px;
  margin: 15px;
  align-items: center;
  font-size: 1.5em;
}

.left-arrow{
  transform: rotate(90deg);
}
.right-arrow {
  transform: rotate(-90deg);
}

@media (max-width: 768px) {
  .back {
    padding-bottom: 70px;
  }
  .card{
    font-size: 0.5rem;
  }
  .name{
    font-size: 0.4rem !important;
  }
}

</style>