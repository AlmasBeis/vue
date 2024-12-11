<template>
  <div class="back">
    <div class="wraper">
      <div class="topper">
        <div class="arrow">
          <div @click="goBack"><img src="@/assets/Arrow.svg" alt="Back" /></div>
        </div>
        <p class="big">Statistic</p>
      </div>
      <div class="stats">
        <BarChart :labels="input.labels" :data="input.numbers" />
        <div class="date-picker-container">
          <div>
            <input class="filtered-dates" ref="flatpickrInput" />
          </div>
          <button class="apply-filter-btn" @click="filterFeedbacks">Apply Filter</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import BarChart from '~/components/BarChart.vue';
import { usePostsStore } from '~/stores/posts';
import { useAuthStore } from '~/stores/auth';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Middleware for auth
definePageMeta({
  middleware: 'auth',
});

const router = useRouter();
const postStore = usePostsStore();
const userStore = useAuthStore();

const filteredFeedbacks = ref([]);


const range = ref({
  start: new Date(2000, 0, 1),
  end: new Date(),
});

const user_id = computed(() => {
  return userStore.user.id;
});

const input = computed(() => {
  const { labels, numbers } = postStore.getStatistic(user_id.value, range.value);
  return { labels, numbers };
});

const goBack = () => {
  if (window.history.length > 1) {
    router.back();
  }
};

const flatpickrInput = ref(null);
const startDate = ref('');
const endDate = ref('');
function initFlatpickr() {
  flatpickr(flatpickrInput.value, {
    mode: 'range',
    dateFormat: 'Y-m-d',
    onChange(selectedDates) {
      if (selectedDates.length === 2) {
        startDate.value = selectedDates[0].toISOString().split('T')[0];
        endDate.value = selectedDates[1].toISOString().split('T')[0];
      }
    },
  });
}
function filterFeedbacks() {
  if (startDate.value && endDate.value) {
    // Update the range with the selected dates
    range.value = {
      start: new Date(startDate.value),
      end: new Date(endDate.value),
    };
  }
}
onMounted(() => {
  initFlatpickr();
});
</script>

<style scoped>
    button {
        cursor: pointer;
    }

    .back {
      position: absolute;
      font-family: 'Inknut Antiqua';
      z-index: 0;
      left: 0;
      height: fit-content;
      min-height: 90vh;
      width: 100%;
      max-width: 100vw;
      background: linear-gradient(to bottom, #adebff, #f7e3e8);
      background-attachment: fixed;
    }

    .topper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .wraper {
        margin: 5% 10%;
        display: flex;
        flex-direction: column;
    }

    .arrow {
        transform: rotate(180deg); 
    }
    
    .big {
        text-align: right;
        color: white;
        font-size: 5em;
    }

    .stats {
        display: flex;
        flex-direction: row;
        margin-top: 50px;
        background-color: rgba(255, 255, 255, 0.3);
        width: 80vw;
        height: 65vh;
    }

    .date-picker-container {
      margin-bottom: 20px;
    }
    .date-form {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .date-form input {
      padding: 5px;
      border-radius: 5px;
    }

    .apply-filter-btn {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    .apply-filter-btn:hover {
      background-color: #0056b3;
    }

    .filtered-dates {
      color: #555;
      background-color: rgb(255, 255, 255);
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      font-family: 'Inknut Antiqua';
    }

</style>