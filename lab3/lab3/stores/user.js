import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    // Состояние
    state: () => ({
        user: null, // Хранит информацию о пользователе
    }),

    // Действия
    actions: {
        setUser(user) {
            this.user = user; // Устанавливает пользователя
        },
        logout() {
            this.user = null; // Удаляет пользователя
        },
        toggleMenu(val) {
            console.log(this.isMenuVisible);
            this.isMenuVisible = {...val}; // Переключает состояние видимости меню
        },
        async login({ username, password }) {
            // Здесь вы можете добавить валидацию или любую логику
            if (username === 'user' && password === 'password') {
                const user = { username }; // Создаем объект пользователя
                this.setUser(user); // Сохраняем пользователя в состоянии
            } else {
                throw new Error('Неверное имя пользователя или пароль'); // Обработка ошибок
            }
        },
        async register({ username, password }) {
            // Здесь вы можете добавить логику регистрации
            const user = { username }; // Создаем объект пользователя
            this.setUser(user); // Сохраняем пользователя в состоянии
        },
    },

    // Геттеры
    getters: {
        isMenuVisible: (state) => state.isMenuVisible,
        isAuthenticated: (state) => !!state.user, // Возвращает true, если пользователь аутентифицирован
    },
});
