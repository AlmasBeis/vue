<!-- pages/profile/[info].vue -->
<template>
  <div>
    <ProfilePage :profile="profileData"/>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useRoute, useAsyncData, useRouter} from 'nuxt/app';
import ProfilePage from '~/components/ProfilePage.vue';
import { useAuthStore } from '~/stores/auth';
import { users } from '@/content/users.js';
import { posts } from '@/content/data.js';

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();

const id = Number(route.params.info);

const user_id = computed(() => {
  if (authStore.user)
    return authStore.user.id;
  return 0;
});

if(id == user_id.value) {
  router.push('/my-profile');
}

const {data: profileData} = await useAsyncData('profileData', async () => {
    let user = users.find(e=> e.id == route.params.info);
    let userPost = posts.filter(e => e.userId == route.params.info);
    user.posts = userPost;
    return user;
});
</script>