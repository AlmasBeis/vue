<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-header">LOGIN</div>
      <form @submit.prevent="login">
        <input v-model="username" type="text" placeholder="Имя пользователя" required />
        <input v-model="password" type="password" placeholder="Пароль" required />
        <a href="#" class="forgot-password">FORGOT PASSWORD?</a>
        <button type="submit">Войти</button>
      </form>
      <p v-if="error">{{ error }}</p>
      <button @click="goToRegister">Зарегистрироваться</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {useAuthStore} from '~/stores/auth'

const router = useRouter();
const store = useAuthStore();

const username = ref('');
const password = ref('');
const error = ref(null);

const login = async () => {
  try {
    let result = await store.login({ email: username.value, password: password.value });
    if (result.success) {
      // Переход на главную страницу при успешном подтверждении
      router.push('/home')
    }
  } catch (err) {
    error.value = err.message;
  }
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
/* Обертка для центрирования */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Высота экрана */
}

.login-container {
  width: 320px;
  padding: 20px;
  text-align: center;
  background: linear-gradient(180deg, #ffffff, #d3d3d3);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.login-header {
  background-color: #66b3ff;
  color: white;
  font-size: 24px;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: -20px -20px 20px -20px;
}

.login-container input[type="text"],
.login-container input[type="password"] {
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  font-family: Arial, sans-serif;
}

.forgot-password {
  font-size: 14px;
  color: black;
  text-decoration: none;
  margin-bottom: 20px;
  display: inline-block;
}

.login-container button {
  width: 80%;
  padding: 10px;
  background: #32cd32;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
}

.login-container button:hover {
  background: #28a745;
}
</style>
