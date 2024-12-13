<template>
    <div class="chat-container">
      <!-- Scrollable message area -->
      <div class="messages-container" ref="messagesContainer">
        <div v-for="(message, index) in chatStore.getMessages(chat_id)" :key="index" :class="{'user-message': message.isUser, 'friend-message': !message.isUser}">
          <img :src="message.isUser ? `${user.avatar}` : `${friend.avatar}`" alt="Avatar" class="avatar" />
          <div class="user-data">
            <p class="name">{{ message.isUser ? 'You' : friend.name }}</p>
            <p style="color: grey;">{{ (message.time?.getHours() || "11") + ":" + (message.time?.getMinutes() || '11')}}</p>
          </div>
          <div class="message-details">
            <p class="message">{{ message.text }}</p>
          </div>
        </div>
      </div>
  
      <!-- Message input and send button -->
      <div class="message-input-container">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type your message..."
          class="message-input"
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage" class="send-button">Send</button>
      </div>
    </div>
  </template>
  
<script setup>
  import { useAuthStore } from '~/stores/auth';
  import { useRoute } from 'vue-router';
  import { useChat } from '~/stores/chat';

  const route = useRoute()
  const chat_id = Number(route.params.id); 

  const userStore = useAuthStore();
  const chatStore = useChat();

  const user_id = computed(() => {
    if (userStore.user)
        return userStore.user.id;
    return 0;
  });

  const friend = userStore.getById(chat_id);
  const user = userStore.getById(user_id.value);

  definePageMeta({
        middleware: 'auth',
    });

  
  const newMessage = ref('');
  const messagesContainer = ref(null);
  
  // Scroll to the bottom when a new message is added
  onUpdated(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
  
  const sendMessage = () => {
    chatStore.sendMessage(newMessage.value, true, chat_id);
    newMessage.value = ''; // Clear the input field
    chatStore.sendMessage("you are blocked dont write me again", false, chat_id);
  };
  </script>

<style scoped>

@media (max-width: 768px) {
  .chat-container {
    padding-bottom: 70px !important;
  }

  .message-input-container{
    padding-bottom: 70px !important;

  }
  .friend-message{
    font-size: 0.6rem !important;
  }

  .user-message{
    font-size: 0.6rem !important;
  }

  .name{
    font-size: 0.5rem !important;
  }
}

  .chat-container {
      display: flex;
      flex-direction: column;
      height: 80vh;
      padding: 16px;
      gap: 12px;
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
  
  .messages-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: 8px;
    padding: 8px;
    margin-bottom: 16px;
  }
  
  .user-data {
    display: flex;
    flex-direction: column;
  }

  .user-message, .friend-message {
    display: flex;
    align-items: center;
    max-width: 60%;
  }
  
  .user-message {
    align-self: flex-end;
    text-align: right;
    flex-direction: row-reverse;
  }
  
  .friend-message {
    align-self: flex-start;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 8px;
  }
  
  .message-details {
    background: #f1f1f1;
    border-radius: 8px;
    padding: 8px 12px;
  }
  
  .user-message .message-details {
    background: #d1eaff;
  }
  
  .name {
    font-weight: bold;
    margin-bottom: 4px;
  }
  
  .message {
    margin: 0;
  }
  
  /* Input and button container */
  .message-input-container {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    gap: 8px;
  }
  
  .message-input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .send-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .send-button:hover {
    background-color: #0056b3;
  }
  </style>
  