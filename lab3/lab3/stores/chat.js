import { defineStore } from 'pinia'
import {useAuthStore} from "~/stores/auth.js";
const auth = useAuthStore()
export const useChat = defineStore('chat', {
    state: () => ({
        data:
            [1, [
                { isUser: false, text: 'Hello!' },
                { isUser: true, text: 'Hi, how are you?' },
            ]
            ],
    }),

    actions: {
        sendMessage(newMessage, isUser, chat_id) {
            if (newMessage.trim() === '') return; // Prevent sending empty messages
            const message = {
                isUser: isUser,
                text: newMessage.trim(),
                time: new Date()
            };
            const message2 = {
                isUser: !isUser,
                text: newMessage.trim(),
                time: new Date()
            };
            if (this.data[chat_id]){
                this.data[chat_id].push(message);
                if(auth.user){
                    this.data[auth.user.id].push(message2);
                }
            }
            else{
                this.data[chat_id] = [message];
                if(auth?.user && this.data[auth?.user?.id]){
                    this.data[auth.user.id] = [message2];
                }
            }
        },
    },

    getters: {
        getMessages: (state) => (chat_id) => {
            return state.data[chat_id];
        },
    }
})
