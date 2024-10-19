<template>
  <div>
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
