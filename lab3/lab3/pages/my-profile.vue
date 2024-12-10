<script setup>
import {computed, defineComponent} from 'vue'
import ProfilePage from "~/components/ProfilePage.vue";
import {useAsyncData} from "nuxt/app";
import {users} from "~/content/users";
import {posts} from "~/content/data";
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

definePageMeta({
  middleware: 'auth',
});

// Fetch profile data based on the route parameter (e.g., "me" for personal profile or user ID for other profiles)
const {data: profileData} = await useAsyncData('profileData', async () => {
   let user = users.find(e => e.username == authStore.user.username);
    let userPost = posts.filter(e => e.userId === user.id);
    user.posts = userPost;
    return user;
});
</script>

<template>
  <ProfilePage :profile="profileData" :isPersonalProfile="true"/>
</template>

<style scoped>

</style>