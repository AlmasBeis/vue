<script setup>
import {defineProps} from 'vue';
import {defineEmits} from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import {ref} from "vue";
import { usePostsStore } from '~/stores/posts'
const router = useRouter();
const postsStore = usePostsStore()

function getFillPercentage(star) {
  const fillAmount = Math.min(Math.max(this.localRating - (star - 1), 0), 1);
  return { width: `${fillAmount * 100}%` };
}

function formatPubDate(pubDate) {
  // Convert the pubDate to a Date object
  const pubDateObj = new Date(pubDate);

  // Get the current time in the user's timezone
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffMs = now - pubDateObj;

  // Calculate the difference in days
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // If the difference is less than a day, format as "Today, HH:MM"
  if (diffDays < 1) {
    const hours = pubDateObj.getHours().toString().padStart(2, '0');
    const minutes = pubDateObj.getMinutes().toString().padStart(2, '0');
    return `Today, ${hours}:${minutes}`;
  } else if (diffDays < 2) {
    // If the difference is 1 day, format as "Yesterday, HH:MM"
    const hours = pubDateObj.getHours().toString().padStart(2, '0');
    const minutes = pubDateObj.getMinutes().toString().padStart(2, '0');
    return `Yesterday, ${hours}:${minutes}`;
  } else {
    // For more than 1 day, format as "N days ago, HH:MM"
    const hours = pubDateObj.getHours().toString().padStart(2, '0');
    const minutes = pubDateObj.getMinutes().toString().padStart(2, '0');
    return `${diffDays} days ago, ${hours}:${minutes}`;
  }

}

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: false
  },
  pubDate: {
    type: Date,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  userId: {
    type: Number
  }
});

const emit = defineEmits(['update-rating']);

const localRating = ref(props.rating || 0);

const handleLike = (id) => {
  postsStore.likeCard(id, props.userId);
};


const goToProfile = (id) => {
  router.push(`/profile/${id}`);
};
</script>

<template>
  <div class="card-cont">
    <div class="card-list">
      <div class="card-item">
        <div class="person">
          <div class="people-name" @click="goToProfile(props.userId)">
            {{ props.name }}
          </div>
          <div class="people-date">{{ formatPubDate(props.pubDate) }}</div>
        </div>
        <div class="card-rating">
          <p class="rating-text">Rating</p>
          <div class="rating-container">
            <Rating :rating="props.rating"/>
          </div>
        </div>
        <div class="photo">
          <img :src="props.avatar"/>
        </div>
      </div>
      <div class="card-comment">{{ props.comment }}</div>
      <div class="card-like">
        <div @click="handleLike(props.id)" class="like">LIKE</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.people-name {
  cursor: pointer;
  overflow-wrap: break-word;
}

.star {
  font-size: 30px;
  position: relative;
}

.empty-star {
  color: lightgray;
}

.filled-star {
  z-index: 1;
  color: gold;
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  transition: width 0.1s ease;
}

.card-cont {
  display: flex;
}

.card-list {
  max-width: 400px !important;
  background-color: rgba(91, 185, 205, 1);
  color: rgba(255, 255, 255, 1);
  padding: 0.2rem 1rem;
  border-radius: 10px;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
}

.card-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.photo img {
  width: 71px;
  height: 72px;
}

.person {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  gap: 1rem;
  background-color: rgba(255, 255, 245, 0.15);
  border-radius: 10px;
  padding: 0.2rem;
  font-size: 20px;
  font-weight: 700;
  max-width: 30%;
}

.card-comment {
  margin-top: 0.4rem;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  flex-wrap: wrap;
}

.card-rating {
  text-align: center;
  font-weight: bold;
}

.card-like {
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem 0;
}

.like {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: rgba(67, 239, 39, 1);
  padding: 0.2rem 1rem;
  font-weight: 700;
  transition: background-color 0.4s ease;
}

.like:hover {
  transition: .4s;
  cursor: pointer;
}

.like:active {
  background-color: rgba(255, 102, 102, 1);
  position: relative;
  top: 5px;
}

.rating-container {
  display: inline-block;
  width: max-content;
}

@media (max-width: 768px) {
  .card-cont {
  }
  .card-list{
    max-width: 8rem !important;

  }

  .card-item {
    font-size: 1rem !important;
    flex-direction: column;
    gap:0;
  }

  .people-date{
    width: max-content;
    overflow: hidden;
    max-height: 2rem;
  }
  .person{
    font-size: 0.5rem !important;
    flex-direction: row;
    max-width: 100%;
  }

  .rating-text{
    font-size: 0.5rem !important;
  }

  .card-rating{
    display: flex;
    flex-direction: row;
  }

  .card-comment{
    display: none;
  }

  .photo img{
    width: 3rem;
    height: 3rem;
  }

  .like{
    padding: 1px;
    font-size: 0.7rem !important;
  }
  .photo{
    line-height: 1;
  }
}


</style>