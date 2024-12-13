<template>
    <div id="card">
        <NuxtLink :to="`/profile/${card.id}`" id="raw1">
            <img :src="`/images/${card.avatar}`" alt="User Avatar" />
        </NuxtLink>
            <div id="name-date">
            <template v-if="isEditing">
                <input 
                    v-model="editableName" 
                    class="name-input" 
                    @keydown.enter="saveName" 
                />
                <p class="activity">Activity: 5 minutes ago</p>
            </template>
            <template v-else>
                <p class="name">{{ card.name }}</p>
                <p class="activity">Activity: 5 minutes ago</p>
            </template>
            </div>
        <div class="button-cont">
            <button v-if="usage" class="delete" @click="deleteCard(card.id)"><p>UNFOLLOW</p></button>
            <button @click="isEditing=true" v-if="usage && !isEditing" class="rename" ><p>RENAME</p></button>
            <button @click="saveName" v-if="usage && isEditing" class="rename" ><p>SAVE</p></button>
            <button v-if="usage" class="chat" @click="chatUser(card.id)"><p>CHAT</p></button>

            <button v-if="!usage" class="chat" @click="follow(card.id)" ><p>FOLLOW</p></button>
        </div>
    </div>
</template>

<script setup>

    import { usePostsStore } from '~/stores/posts';
    import { useAuthStore } from '@/stores/auth';
    import { defineProps } from 'vue';
    import {useRouter} from "#vue-router";


    const cardStore = usePostsStore()
    const userStore = useAuthStore()

    const cardProps = defineProps({
        id: {
            type: Number,
            required: true
        },
        usage: {
            type: Number,
            default: 0,
        }
    });
    const router = useRouter();


    const card = userStore.getById(cardProps.id);
    const isEditing = ref(false);
    const editableName = ref(card.name);

    const usage = computed(() => { return userStore.user?.id ? userStore.getById(userStore.user?.id)?.friends?.findIndex(friend => friend === cardProps.id) !== -1 : false;});

    function chatUser(id) {
        if(userStore.token)
            router.push(`/chat/${id}`)
    }

    function deleteCard(id) {
        userStore.unfollow(id);
    }

    function follow(id) {
        userStore.addToFavorite(id);
    }

    function saveName() {
        const userObj = {
            id: cardProps.id,
            name: editableName.value,
        }
        card.name = editableName.value;
        userStore.updateUserName(userObj);
        isEditing.value = false;
    }
</script>

<style scoped>

@media (max-width: 768px) {
  #card{
    font-size: 0.5rem;
  }
  .name{
    font-size: 1rem;
  }

  .activity{
    font-size: 0.6rem;
  }

  .button-cont{
    display: flex;
    flex-direction: column;
  }

  .button-cont {
    display: flex;
    flex-direction: column;
    gap: 0.5rem; /* Добавляем отступ между кнопками */
  }

  .button-cont p {
    font-size: 0.6rem; /* Меньший размер текста */
    width: auto; /* Убираем фиксированную ширину */
  }

  .button-cont button {
    text-align: center;
    padding: 5px 10px; /* Меньший внутренний отступ */
    font-size: 0.8rem; /* Меньший шрифт */
    width: auto; /* Убираем фиксированную ширину */
    height: auto;
  }

  .chat {
    background-color: greenyellow;
    border: 0;
    border-radius: 15px; /* Уменьшаем радиус скругления */
    width: 100%; /* Растягиваем кнопку */
    height: auto;
    color: white;
  }

  .rename {
    background-color: rgb(43, 178, 193);
    border: 0;
    border-radius: 15px;
    width: 100%;
    height: auto;
    color: white;
  }

  .delete {
    background-color: red;
    border: 0;
    border-radius: 15px;
    width: 100%;
    height: auto;
    color: white;
  }

  img {
    width: 60px; /* Уменьшаем размер изображения */
    height: 60px;
  }

}
    #card {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        padding: 15px 0;
    }

    #raw1 {
        text-decoration: none;
        color: inherit;
        display: flex;
        flex-direction: row;
    }

    #name-date {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    .chat {
        background-color: greenyellow;
        border: 0;
        border-radius: 20px;
        width: 120px;
        height: 40px;
        color: white;
    }

    .rename {
        background-color: rgb(43, 178, 193);
        border: 0;
        border-radius: 20px;
        width: 120px;
        height: 40px;
        color: white;
    }

    .delete{
        background-color: red;
        border: 0;
        border-radius: 20px;
        width: 120px;
        height: 40px;
        color: white;
    }

    p {
        color: white;
        font-size: 1.5rem;
        margin: 0;
        padding: 0;
    }

    img {
        width: 80px;
        height: 80px;
    }

    .activity {
        color: red;
    }

</style>