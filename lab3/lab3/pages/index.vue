<template>
  <div class="login-container">
    <div class="login-header">LOGIN</div>
    <form>
      <input v-model="username" type="text" placeholder="Имя пользователя" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <a href="#" class="forgot-password">FORGOT PASSWORD?</a>
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
<style>

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background: linear-gradient(180deg, rgba(72, 181, 164, 0.8), rgba(67, 213, 213, 0.45) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background: #e3e3e3;

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