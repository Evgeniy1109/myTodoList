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

import { ref, onMounted } from 'vue';
import { collection, onSnapshot, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from '../src/firebase';
import { FirebaseError } from 'firebase/app';

// Firebase ref
const todosCollectionRef = collection(db, "todos")

//todos

const todos = ref([
  // {
  //   id: 'id1',
  //   content: 'hello guys',
  //   done: false
  // },
  // {
  //   id: 'id2',
  //   content: 'check this thing',
  //   done: false
  // },
]);

// get todos
onMounted(() => {
    onSnapshot(todosCollectionRef, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
            id: doc.id,
            content: doc.data().content,
            done: doc.data().done,
      };
          fbTodos.push(todo)
    });
    todos.value = fbTodos;
  });
})


// add todos
const newtodoContent = ref('');

const addTodo = () => {
  addDoc(todosCollectionRef, {
    content: newtodoContent.value,
    done: false
  });
  newtodoContent.value = '';
};


// delete todo
const deleteToDo = id => {
  deleteDoc(doc(todosCollectionRef, id));
};

// toggle done
const togglerDone = id => {
  const index = todos.value.findIndex((todo) => todo.id === id);

  updateDoc(doc(todosCollectionRef, id), {
    done: !todos.value[index].done,
  });
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


