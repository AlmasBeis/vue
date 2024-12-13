<script setup >
import {ref, watch, computed, onBeforeMount} from 'vue';
import {useRouter} from 'vue-router';
import PeopleCard from '@/components/PeopleCard.vue'
import { useAuthStore } from '~/stores/auth'
import { usePostsStore } from '~/stores/posts'

import arrow from "assets/Arrow.svg";


const authStore = useAuthStore();
const isAuthenticated = authStore.token != null;
const router = useRouter();
// Define props
const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
  isPersonalProfile: {
    type: Boolean,
    default: false,
  }
});

const personName = computed(() => {return authStore.user?.customNames[props.profile.id] || props.profile?.name});


// Editable profile data that starts with props data
const editableProfile = ref({...props.profile});

// Computed property to determine if the profile is readonly
const isReadOnly = computed(() => !props.isPersonalProfile);

// Watch for changes in `profile` prop to update `editableProfile`
watch(() => props.profile, (newProfile) => {
  editableProfile.value = {...newProfile};
});

const addFavourite = () => {
  authStore.addToFavorite(props.profile.id);
}

const deleteFavourite = () => {
  authStore.unfollow(props.profile.id);
}

// Save function to persist data if it's a personal profile
const saveProfile = () => {
  if (props.isPersonalProfile && isAuthenticated) {
    const userObj = {
      id: authStore.user.id,
      age: editableProfile.value.age,
      location: editableProfile.value.location
    }
    authStore.updateUser(userObj);
  }
};

// Подключение Pinia-сторов
const postsStore = usePostsStore();

const pageSize = 3;

const currentPage = ref(1);
// Геттеры
const paginatedList = computed(() => {return postsStore.paginatedAuthorCards(pageSize, props.profile.id, currentPage.value)});
const totalPages = Math.ceil(props.profile.posts.length / pageSize);
const usage = computed(() => { return authStore.user?.id ? authStore.getById(authStore.user?.id)?.friends?.findIndex(friend => friend === props.profile.id) !== -1 : false;});


const handleNextPage = () => {
  if (currentPage.value < totalPages) {
    currentPage.value = currentPage.value + 1;
  } else {
    currentPage.value = 1;
  }
};

const isMobile = inject('isMobile');
</script>

<template>
  <div class="profile-page">
    <div v-if="!isReadOnly" class="profile-header">My profile</div>
    <div v-else class="profile-header">Profile</div>

    <div class="profile-content">
      <div class="left-panel">
        <div class="profile-avatar">
          <img :src="profile.avatar" alt="Avatar">
        </div>

        <!-- Editable fields for profile information -->
        <div class="profile-info">
          <div class="profile-name">{{personName}}</div>
          <div class="age-label"><p>Age:</p>
            <input type="number" v-model="editableProfile.age" placeholder="Enter age" :readonly="isReadOnly"/></div>
          <div class="address-label"><input v-model="editableProfile.location" placeholder="Enter location" :readonly="isReadOnly"/>
          </div>
          <div class="activity-label">Active now</div>
          <div class="current-rating">
            <p class="rating-text">Current rating:</p>
            <div class="stars">
              <Rating :rating="postsStore.getAuthorAverageRating(profile.id)"/>
            </div>
          </div>
        </div>


      </div>

      <div class="right-panel">
        <div v-if="!isReadOnly" class="button-container">
          <button class="btn-statistic" @click="router.push('/my-statistics')">Statistic</button>
          <button class="btn-save" @click="saveProfile" v-if="!isReadOnly">SAVE</button>
          <button class="btn-save" @click="router.push('/my-friends')">Friends</button>
        </div>
        <div v-else class="button-container">
          <button @click="addFavourite" class="btn-statistic" v-if="!usage">Follow</button>
          <button @click="deleteFavourite" class="btn-statistic-red" v-else>Unfollow</button>
          <button @click="router.push(`/chat/${profile.id}`)" class="btn-statistic">Chat Now</button>
          <button class="btn-save" @click="router.push(`/friends/${profile.id}`)">Friends</button>
        </div>
      </div>
    </div>
    <div class="cards">
    <PeopleCard v-for="person in paginatedList"
                :key="person.id"
                :id="person.id"
                :name="person.PersonName"
                :avatar="person.Avatar"
                :pubDate="person.PubDate"
                :comment="person.Commentary"
                :rating="person.Rating">
    </PeopleCard>
    </div>
    <div class="arrow">
      <div @click="handleNextPage" class="arrow-cont">
        <img :src="arrow" alt=""/>
      </div>
      <div class="pagin">{{ currentPage }}/{{ totalPages }}</div>
    </div>
  </div>
</template>

<style scoped>
.cards {
  line-height: 2.6;
  margin-top: 4rem;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 4rem;
  justify-content: center;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none; /* Убираем стандартный вид */
  margin: 0; /* Убираем отступы */
}
.arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
}
/* Скрываем стрелки для Firefox */
input[type="number"] {
  -moz-appearance: textfield; /* Меняем вид на текстовое поле */
}
.profile-info input {
  font-family: 'Inknut Antiqua';
  border: none;
  background: none;
  font-weight: bold;
  outline: none;
  background: #2c82aa;
  font-size: 16px; /* Match the font size to regular text */
  color: #ffffff; /* Match the text color to regular text */
  width: 100%;
  margin-bottom: 10px;
  padding: 0;
  cursor: text; /* To indicate it’s editable if not readonly */
}

.profile-info input:read-only {
  cursor: default; /* Show regular cursor when input is read-only */
}

.profile-avatar{
  background: #00ffcd;
  height: 90%;
  display: flex;
  justify-content: center;
  border-radius: 50px;
  align-items: center;
}
.profile-page {
  line-height: 1.6;
  background: linear-gradient(to bottom, #89d4cf, #6fa0c7);
  padding: 20px;
  font-family: 'Inknut Antiqua';
  color: #333;
  height: 100%;
}

/* Banner */
.profile-name {
  font-family: 'Inknut Antiqua';
  text-align: left;
  font-size: 44px;
  color: #005478;
}

/* Header */
.profile-header {
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 50px;
  color: #ffffff;
}
.activity-label{
  color:green;
  text-align: left;
  margin-bottom: 10px;
}
.address-label{
  margin: 10px 0;
}
.age-label{
  display: flex;
  width: fit-content;
}
.age-label p{
  line-height: 3;
  margin-right: 10px;
}
.age-label input{
  margin: 0;
  width: 10%;
  text-align: center;
}
/* Profile Content */
.profile-content {
  display: flex;
  margin-top: 20px;
}

/* Left Panel */
.left-panel {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  margin-right: 20px;
}

.profile-avatar img {
  width: 100px;
  height: 100px;
}

.current-rating {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}

.rating-text {

}

.stars {
  font-size: 20px;
  color: gold;
}

/* Right Panel */
.right-panel {
  width: 30%;
  padding: 20px;
}

.button-container {
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  align-items: flex-end; /* Align buttons to the right */
  gap: 10px; /* Space between buttons */
  margin-bottom: 20px;
  margin-left: 20px;
}

.btn-statistic, .btn-save {
  background-color: #4dc3ff;
  font-family: 'Inknut Antiqua';
  line-height: 1;
  font-size: 25px;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 70%;
}
.btn-statistic-red {
  background-color: #fd4c4c;
  font-family: 'Inknut Antiqua';
  line-height: 1;
  font-size: 25px;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 70%;
}

.latest-posts button {
  background: #e0e0e0;
  padding: 8px 16px;
  font-weight: bold;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  .profile-info {
    font-size: 10px;
  }
  .profile-header {
    font-size: 2rem;
  }
  .profile-name{
    font-size: 1.5rem;
    overflow-wrap: break-word;
    width: 70%;
  }

  .address-label input {
    font-size: 0.5rem;
    width: auto;
  }

  .age-label input {
    font-size: 0.5rem;
  }

  .left-panel {
    padding: 0.5rem;
    gap: 0.5rem;
    width: 70%;
  }

  .right-panel {
    padding: 0.5rem;
  }

  .button-container{
    margin: 0;
  }

  .button-container button {
    font-size: 0.8rem;
    width: 100%;
    padding: 0.4rem;
    overflow: hidden;
  }

  .cards{
    gap: 1rem
  ;
  }

}

@media (max-width: 320px) {
  .button-container button {
    font-size: 0.6rem;
    width: 100%;
    padding: 0.4rem;
    overflow: hidden;
  }
}
</style>