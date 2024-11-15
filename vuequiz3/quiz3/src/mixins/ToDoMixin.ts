import { reactive } from 'vue';

export const useTodoMixin = () => {
    const state = reactive({
        todoInput: '',
        todos: [] as { id: number, text: string, completed: boolean }[],
        filter: 'all' as 'all' | 'completed' | 'incomplete'
    });

    const addTodo = () => {
        if (state.todoInput.trim() !== '') {
            const newTodo = {
                id: Date.now(),
                text: state.todoInput,
                completed: false,
            };
            state.todos.push(newTodo);
            state.todoInput = '';  // Clear input
        }
    };

    const deleteTodo = (id: number) => {
        state.todos = state.todos.filter(todo => todo.id !== id);
    };

    const toggleCompletion = (id: number) => {
        const index = state.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            const updatedTodo = { ...state.todos[index], completed: !state.todos[index].completed };
            state.todos.splice(index, 1, updatedTodo);
        }
    };

    return {
        state,
        addTodo,
        deleteTodo,
        toggleCompletion
    };
};