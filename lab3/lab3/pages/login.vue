<template>
  <div class="container">
    <h1>Авторизация</h1>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Имя пользователя" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <button @click="goToRegister">Зарегистрироваться</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'; // Импортируем ref для создания реактивных переменных
import { useRouter } from 'vue-router'; // Импортируем useRouter для маршрутизации
import { useUserStore } from '@/stores/user'; // Импортируем Pinia store

const router = useRouter(); // Получаем экземпляр маршрутизатора
const store = useUserStore(); // Получаем доступ к Pinia store

const username = ref(''); // Создаем реактивную переменную для имени пользователя
const password = ref(''); // Создаем реактивную переменную для пароля
const error = ref(null); // Реактивная переменная для хранения ошибок

const login = async () => {
  try {
    await store.login(username.value, password.value); // Вызываем action для входа
    router.push('/'); // Перенаправляем на главную страницу после успешного входа
  } catch (err) {
    error.value = err.message; // Обрабатываем ошибку
  }
};

const goToRegister = () => {
  router.push('/register'); // Программный переход на страницу регистрации
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background: linear-gradient(to bottom, #adebff, #f7e3e8);
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
}

/* Обертка для всего контента */
.container{
  width: 400px; /* Set a consistent width for both containers */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin: 0 10px; /* Add some horizontal margin */
}

/* Стиль для первого контейнера */
.container {
  background-color: rgba(255, 255, 255, 0.9); /* Slightly transparent white for the registration form */
}

/* Поля ввода */
label {
  display: block;
  text-align: left;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"]{
  width: 90%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #3dd4d8;
  color: #fff;
  margin-bottom: 15px;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  background-color: #29b6c0;
}

/* Поле для ввода секретной фразы */
input[id="secretPhrase"] {
  width: 80%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4291a3;
  color: #fff;
  margin-bottom: 20px;
  text-align: center;
}

input[id="secretPhrase"]:focus {
  outline: none;
  background-color: #357a88;
}

</style>
