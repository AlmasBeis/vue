<template>
  <div v-if="isModalOpen" class="modal-overlay" @click.self="store.toggleLoginPanel()">
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
      <span class="close-button" @click="store.toggleLoginPanel">&#x2715;</span>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useAuthStore} from '~/stores/auth';
import {useStore} from '~/stores/index';


const router = useRouter();
const auth = useAuthStore();
const store = useStore();


const username = ref('');
const password = ref('');
const error = ref(null);
const isModalOpen = ref(store.isLoginPanel);

const login = async () => {
  try {
    let result = await auth.login({email: username.value, password: password.value});
    if (result.success) {
      store.toggleLoginPanel(); // Закрыть модальное окно при успешной авторизации
      router.push('/');
    }
  } catch (err) {
    error.value = err.message || 'Ошибка авторизации';
  }
};

const goToRegister = () => {
  router.push('/register');
};

</script>

<style scoped>
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
/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Центрируем окно */
.login-container {
  position: relative;
  width: 320px;
  padding: 20px;
  text-align: center;
  background: linear-gradient(180deg, #ffffff, #d3d3d3);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1001;
}

/* Кнопка закрытия */
/* Стили крестика */
.login-container .close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  color: #333;
  cursor: pointer;
}

.login-container .close-button:hover {
  color: #ff0000;
  transform: scale(1.2);
}
</style>
