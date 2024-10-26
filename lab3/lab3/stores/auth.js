// stores/auth.js
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        isEmailConfirmed: false,
        confirmationCodeSent: false,
    }),
    actions: {
        async login(credentials) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    // Схематично: проверка данных для успешного входа
                    if (credentials.email === 'user@example.com' && credentials.password === 'password') {
                        this.user = { email: credentials.email }
                        this.token = 'fake-jwt-token'
                        resolve({ success: true })
                    } else {
                        console.error("Неверные данные входа")
                        resolve({ success: false })
                    }
                }, 1000)
            })
        },
        async register(credentials) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (credentials.email && credentials.password) {
                        // Симулируем успешную регистрацию и отправку кода
                        this.confirmationCodeSent = true
                        resolve({ success: true, message: "Код подтверждения отправлен" })
                    } else {
                        console.error("Ошибка при регистрации")
                        resolve({ success: false })
                    }
                }, 1000)
            })
        },
        async confirmEmailCode({ email, code }) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (code === '123456') { // Предположим, что 123456 — правильный код
                        this.isEmailConfirmed = true
                        this.user = { email }
                        this.token = 'fake-jwt-token'
                        resolve({ success: true })
                        alert("Email подтверждён!")
                    } else {
                        console.error("Неверный код подтверждения")
                        resolve({ success: false })
                    }
                }, 1000)
            })
        },
        logout() {
            this.user = null
            this.token = null
            this.isEmailConfirmed = false
            this.confirmationCodeSent = false
        }
    },
})
