<!-- pages/profile/[info].vue -->
<template>
  <div>
    <ProfilePage :profile="profileData" :isPersonalProfile="isPersonalProfile"/>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {useRoute, useAsyncData} from 'nuxt/app';
import ProfilePage from '~/components/ProfilePage.vue';

const route = useRoute();

// Check if the current profile is the personal profile
const isPersonalProfile = computed(() => route.params.info === 'me');

// Fetch profile data based on the route parameter (e.g., "me" for personal profile or user ID for other profiles)
const {data: profileData} = await useAsyncData('profileData', async () => {
  const profileId = route.params.info;

  // Replace this with an API call if you have one, or use mock data
  if (profileId === 'me') {
    return {
      name: 'Mark Twen',
      age: 32,
      location: 'Colorado, Texas',
      activity: 'for now',
      posts: [
        {
          id: 1,
          PersonName: "Mark Twen",
          Avatar: "https://media.istockphoto.com/id/183821822/photo/say.jpg?s=612x612&w=0&k=20&c=kRmCjTzA9cq4amgRgeHkZsZuvxezUtC8wdDYfKg-mho=",
          PubDate: new Date('2024-09-13 12:00'),
          Rating: 5,
          Commentary: "This is an awesome adventure that I had! Thanks!",
          Topic: "Adventure"
        },
        {
          id: 2,
          PersonName: "Katherine Johns",
          Avatar: "https://media.istockphoto.com/id/183821822/photo/say.jpg?s=612x612&w=0&k=20&c=kRmCjTzA9cq4amgRgeHkZsZuvxezUtC8wdDYfKg-mho=",
          PubDate: new Date('2024-09-08 12:15'),
          Rating: 4,
          Commentary: "The place is very big. I lost the exit.",
          Topic: "Adventure"
        },
        {
          id: 3,
          PersonName: "John Smith",
          Avatar: "https://media.istockphoto.com/id/183821822/photo/say.jpg?s=612x612&w=0&k=20&c=kRmCjTzA9cq4amgRgeHkZsZuvxezUtC8wdDYfKg-mho=",
          PubDate: new Date('2024-09-10 14:30'),
          Rating: 3,
          Commentary: "The event was good, but not great.",
          Topic: "Adventure"
        }]
    };
  } else {
    // Mock data for another user's profile
    return {
      name: 'John Doe',
      age: 28,
      location: 'Austin, Texas',
      activity: 'active',
      // other profile data...
    };
  }
});
</script>