// stores/auth.js
import { defineStore } from 'pinia'
import { users } from '@/content/users.js';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        usersData: users,
        token: null,
        isEmailConfirmed: false,
        confirmationCodeSent: false,
    }),
    getters: {
        getById: (state) => (id) => {
            return state.usersData.find((user) => user.id === id);
        },

        getFavorites: (state) =>(id) => {
            if (id === -1){
                if (state.token) {
                    const favorites = state.usersData.find(user => user.id === state.user.id).friends;
                    return favorites.map(id => state.getById(id));
                }
                return [];
            }
            const favorites = state.usersData.find(user => user.id === id).friends;
            return favorites.map(id => state.getById(id));
        },

        paginatedFavorites: (state) => (pageSize, id=-1, currentPage) => {
            const start = (currentPage - 1) * pageSize;
            const end = start + pageSize;
            return state.getFavorites(id).slice(start, end);
        }
    },
    actions: {
        async login(credentials) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    // Схематично: проверка данных для успешного входа
                    if (users.find(e=> e.username === credentials.email) !== -1 && users.find(e=> e.username === credentials.password) !== -1) {
                        this.user = users.find(e=> e.username === credentials.email)
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
        },
        updateUser(updatedUser) {
            for(let i = 0; i < this.usersData.length; i++) {
                if(this.usersData[i].id === updatedUser.id) {
                    this.usersData[i].age = updatedUser.age;
                    this.usersData[i].location = updatedUser.location;
                    this.user = this.usersData[i];
                    break;
                }
            }
        },
        updateUserName(updatedUser) {
            if(this.user.customNames[updatedUser.id] === undefined){
                this.user.customNames[updatedUser.id] = updatedUser.name;
                return;
            }
            for (let [key, value] of Object.entries(this.user.customNames)) {
                if(key == updatedUser.id) {
                    value = updatedUser.name;
                }
            }
            const userIndex = this.usersData.findIndex(user => user.id === this.user.id);
            if (this.usersData[userIndex]){
                this.usersData[userIndex] = this.user;
            }
        },
        addToFavorite(id) {
            if(this.user) {
                const userIndex = this.usersData.findIndex(user => user.id === this.user.id);
                if (!this.usersData[userIndex].friends.includes(id))
                    this.usersData[userIndex].friends.push(id);
                    this.user = this.usersData[userIndex];
            }
        },

        unfollow(id) {
            if(this.user) {
                const userIndex = this.usersData.findIndex(user => user.id === this.user.id);
                const idIndex = this.usersData[userIndex].friends.indexOf(id);
                if (idIndex !==-1)
                    this.usersData[userIndex].friends.splice(idIndex, 1);
                console.log(this.usersData[userIndex].friends)
            }
        }
    }
})
