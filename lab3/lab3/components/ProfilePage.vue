<script setup lang="ts">
import {ref, watch, computed} from 'vue';
import {useRoute} from 'vue-router';
import PeopleCard from '@/components/PeopleCard.vue'
import {peopleData} from "~/content/data";
import { useAuthStore } from '~/stores/auth'



const authStore = useAuthStore();
const isAuthenticated = authStore.token != null;
const route = useRoute();
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
const list = props.profile.posts;
let itemsPerPage = 4
// Recalculate total pages when the list changes
const totalPages = computed(() => Math.ceil(list.value.length / itemsPerPage));
const currentPageInternal = ref(1);  // Internal tracking of current page

const currentPage = computed(() => {
  return totalPages.value === 0 ? 0 : currentPageInternal.value;
});

const paginatedList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return list.value.slice(start, end);
});

// Editable profile data that starts with props data
const editableProfile = ref({...props.profile});

// Computed property to determine if the profile is readonly
const isReadOnly = computed(() => !props.isPersonalProfile);

// Watch for changes in `profile` prop to update `editableProfile`
watch(() => props.profile, (newProfile) => {
  editableProfile.value = {...newProfile};
});

const addFavourite = () => {
  authStore.addFavorite(props.profile.id);
}

onMounted(() => {
  if(!isAuthenticated){
    router.push('/');
  }
});

// Save function to persist data if it's a personal profile
const saveProfile = () => {
  if (props.isPersonalProfile) {
    localStorage.setItem('profileData', JSON.stringify(editableProfile.value));
    alert('Profile saved!');
  }
};
</script>

<template>
  <div class="profile-page">
    <div v-if="!isReadOnly" class="profile-header">My profile</div>
    <div v-else class="profile-header">Profile</div>

    <div class="profile-content">
      <div class="left-panel">
        <div class="profile-avatar">
          <img src="@/assets/avatar.svg" alt="Avatar">
        </div>

        <!-- Editable fields for profile information -->
        <div class="profile-info">
          <div class="profile-name">{{profile.name}}</div>
          <div class="age-label"><p>Age:</p>
            <input type="number" v-model="editableProfile.age" placeholder="Enter age" :readonly="isReadOnly"/></div>
          <div class="address-label"><input v-model="editableProfile.location" placeholder="Enter location" :readonly="isReadOnly"/>
          </div>
          <div class="activity-label">Active now</div>
          <div class="current-rating">
            <p>Current rating:</p>
            <div class="stars">
              <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>☆</span>
            </div>
          </div>
        </div>


      </div>

      <div class="right-panel">
        <div v-if="!isReadOnly" class="button-container">
          <button class="btn-statistic">Statistic</button>
          <button class="btn-save" @click="saveProfile" v-if="!isReadOnly">SAVE</button>
        </div>
        <div v-else class="button-container">
          <button @click="addFavourite" class="btn-statistic">Follow</button>
        </div>
      </div>
    </div>
    <div class="cards">
    <PeopleCard v-for="person in profile.posts"
                :key="person.id"
                :name="person.PersonName"
                :avatar="person.Avatar"
                :pubDate="person.PubDate"
                :comment="person.Commentary"
                :rating="person.Rating"></PeopleCard>
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
  align-items: left;
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

.latest-posts {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}

.latest-posts button {
  background: #e0e0e0;
  padding: 8px 16px;
  font-weight: bold;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
}

.post-card {
  background-color: #a8e0ff;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.btn-delete {
  background-color: #ff4d4d;
  color: #ffffff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.pagination {
  text-align: center;
  font-size: 18px;
}

</style>