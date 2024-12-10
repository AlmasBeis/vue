<template>
  <div class="login-wrapper">
    <div v-if="!isCodeSent" class="container">
      <!-- Верхнее уведомление -->

      <!-- Переключатель профиля и регистрации -->
      <div class="tabs">
        <a href="#" class="tab">PROFILE | REGISTRATION</a>
      </div>

      <!-- Форма регистрации -->
      <form @submit.prevent="handleRegister">
        <label for="email">Enter your email</label>
        <input v-model="email" type="email" id="email" placeholder="user@example.com">

        <label for="username">Create username</label>
        <input type="text" id="username" placeholder="user">

        <label for="password">Create password</label>
        <input v-model="password" type="password" id="password" placeholder="********">

        <label for="confirm-password">Confirm password</label>
        <input v-model="confirmPassword" type="password" id="confirm-password" placeholder="********">

        <button type="submit" class="button">CREATE USER</button>
      </form>
    </div>
    <div v-else class="container2">

      <!-- Заголовок шага -->
      <div class="step-title">TO CREATE ACCOUNT DO NEXT STEPS</div>

      <form @submit.prevent="handleConfirmCode" id="accountCreationForm">
        <!-- Подтверждение email -->
        <label for="email">CONFIRM YOUR EMAIL</label>

        <label for="secretPhrase">ENTER THE SECRET PHRASE</label>
        <input type="text" v-model="confirmationCode" id="secretPhrase" placeholder="****************" required>

        <!-- Кнопка создания пользователя -->
        <button type="submit" class="create-button">CREATE USER</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useAuthStore} from '~/stores/auth'
import {useRouter} from 'vue-router'

const router = useRouter()

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isCodeSent = ref(false)
const confirmationCode = ref('')

const handleRegister = async () => {
  if (password.value === confirmPassword.value) {
    // Отправка данных для регистрации
    await authStore.register({email: email.value, password: password.value})
    isCodeSent.value = true
  } else {
    alert("Passwords do not match")
  }
}

const handleConfirmCode = async () => {
  const result = await authStore.confirmEmailCode({email: email.value, code: confirmationCode.value})
  if (result.success) {
    // Переход на главную страницу при успешном подтверждении
    router.push('/home')
  } else {
    alert("Неверный код")
  }
}

</script>

<style scoped>

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Высота экрана */
}
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
.container,
.container2 {
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

/* Стиль для второго контейнера */
.container2 {
  background-color: #3dd4d8; /* Solid color for confirmation */
  width: 400px; /* Adjust width to match .container */
}

/* Стиль для переключателя профиля и регистрации */
.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

#accountCreationForm {
  text-align: left; /* Aligns all form elements to the left */
}

.step-title {
  font-size: 20px;
  margin-bottom: 15px; /* Space below the title */
  color: #fff; /* Make title stand out */
}

.tab {
  color: #fff;
  background-color: #3dd4d8;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
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
input[type="password"] {
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

/* Кнопка создания пользователя */
.button {
  background-color: #32e278;
  color: #fff;
  border: none;
  padding: 12px 20px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #2ac967;
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

/* Кнопка создания пользователя */
.create-button {
  background-color: #3ba0d4;
  color: #fff;
  border: none;
  padding: 12px 20px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.create-button:hover {
  background-color: #2c82aa;
}

/* Кнопки профиля и меню */
.icon-button {
  background-color: #32e278;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
}

.icon-menu {
  top: 10px;
  left: 10px;
}

.icon-profile {
  top: 10px;
  right: 10px;
}
</style>
