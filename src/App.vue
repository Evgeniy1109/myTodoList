<template>
  <div class="wrapper">
    <div class="title has-text-centered">My ToDo List</div>

    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input
          v-model="newtodoContent"
           class="input" type="text" placeholder="Add a todo">
        </p>
        <p class="control">
            <button :disabled="!newtodoContent" class="button is-info">
              Add
            </button>
          </p>
      </div>
    </form>

    <div
      v-for="todo in todos" :key="todo.id" class="card"
      :class="{'has-background-success-light' : todo.done}">
          <div class="card-content">
            <div class="content">
              <div class="columns is-vcentered">
                <div class="column column_card_text"
                :class="{'has-text-success line-through': todo.done}"
                > {{ todo.content }} </div>
                <div class="column is-5 has-text-right">
                  <button class="button card-content_btn"
                  :class="todo.done ? 'is-success' : 'is-light'"
                  @click="togglerDone(todo.id)">&#9989;</button>
                <button @click="deleteToDo(todo. id)" class="button">&#10062;</button>
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>


<script setup>

import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

//todos

const todos = ref([
  {
    id: 'id1',
    content: 'hello guys',
    done: false
  },
  {
    id: 'id2',
    content: 'check this thing',
    done: false
  },
]);

// add todo/

const newtodoContent = ref('');

const addTodo = () => {
  const newTodo = {
    id: uuidv4(),
    content: newtodoContent.value,
    done: false
  };
  todos.value.unshift(newTodo);
  newtodoContent.value = '';
};

// delete todo
const deleteToDo = id => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};
const togglerDone = id => {
  const index = todos.value.findIndex((todo) => todo.id === id);
  todos.value[index].done = !todos.value[index].done;
}
</script>


<style>
  @import 'bulma/css/bulma.min.css';
  .wrapper{
    width: 100%;
    max-width: 500px;
    padding: 20px;
    margin: 0 auto;
  }
  .card{
    border: 1px solid grey;
    background-color: grey;
    margin-bottom: 10px;
  }
  .column_card_text{
    color: #000;
    font-size: 24px;
    word-break: break-all;
  }
  .card-content_btn{
    margin-right: 10px;
  }
.line-through{
  text-decoration: line-through;
}
</style>


