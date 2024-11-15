<template>
  <div class="todo-app">
    <div class="input-section">
      <input v-model="state.todoInput" type="text" placeholder="Add a new todo..." />
      <button @click="addTodo">Add</button>
    </div>

    <div class="filter-section">
      <button @click="state.filter = 'all'">All</button>
      <button @click="state.filter = 'completed'">Completed</button>
      <button @click="state.filter = 'incomplete'">Incomplete</button>
    </div>

    <transition-group name="fade" tag="ul">
      <li
          v-for="todo in state.todos"
          :key="todo.id"
          :class="{ completed: todo.completed }"
          class="todo-item"
      >
        <input
            type="checkbox"
            @change="toggleCompletion(todo.id)"
            class="todo-checkbox"
        />
        <span>{{ todo.text }}</span>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, nextTick } from 'vue';
import { useTodoMixin } from '@/mixins/ToDoMixin';

export default defineComponent({
  setup() {
    const { state, addTodo, deleteTodo, toggleCompletion } = useTodoMixin();

    const filteredTodos = computed(() => {
      if (state.filter === 'completed') {
        return state.todos.filter(todo => todo.completed);
      } else if (state.filter === 'incomplete') {
        return state.todos.filter(todo => !todo.completed);
      }
      return state.todos;
    });

    // Watch the filter state and run nextTick when changed
    const watchFilter = () => {
      nextTick(() => {
        console.log('Filter updated and DOM updated');
      });
    };

    return {
      state,
      addTodo,
      deleteTodo,
      toggleCompletion,
      filteredTodos,
      watchFilter
    };
  }
});
</script>

<style scoped>
.todo-app {
  width: 1000px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.input-section {
  display: flex;
  justify-content: space-between;
}

input {
  width: 70%;
  padding: 5px;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s ease-in-out;
}

button:hover {
  background-color: #0056b3;
}

button:active {
  transform: scale(0.95);
  background-color: #004085;
}

.filter-section {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

ul {
  list-style: none;
  padding-left: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 0;
  transition: background-color 0.3s;
}

.todo-item.completed {
  text-decoration: line-through;
  color: #aaa;
}

/* Style for completed todo items */
.todo-item.completed input[type="checkbox"] {
  background-color: #28a745; /* Green check when completed */
}

.todo-checkbox {
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.todo-checkbox:checked {
  background-color: #28a745; /* Green check when completed */
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>


