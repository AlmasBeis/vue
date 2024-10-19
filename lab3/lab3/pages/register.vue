<template>
  <div>
    <h1>Регистрация</h1>
    <form @submit.prevent="register">
      <input v-model="username" type="text" placeholder="Имя пользователя" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Зарегистрироваться</button>
    </form>
    <button @click="goToLogin">Уже зарегистрированы? Войти</button>
  </div>
</template>

<script setup>
import {ref} from 'vue'; // Импортируем ref для создания реактивных переменных
import {useRouter} from 'vue-router'; // Импортируем useRouter для маршрутизации
import {useUserStore} from '@/stores/user'; // Импортируем Pinia store

const router = useRouter(); // Получаем экземпляр маршрутизатора
const store = useUserStore(); // Получаем доступ к Pinia store

const username = ref(''); // Создаем реактивную переменную для имени пользователя
const password = ref(''); // Создаем реактивную переменную для пароля

const register = async () => {
  try {
    await store.register(username.value, password.value); // Вызываем action для регистрации
    router.push('/login'); // Перенаправляем на страницу входа после регистрации
  } catch (error) {
    console.error('Registration failed:', error); // Обработка ошибок
  }
};

const goToLogin = () => {
  router.push('/login'); // Программный переход на страницу входа
};
</script>
