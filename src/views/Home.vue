<template>
  <div class="home">
    <router-link to="/signin" class="log-out">Log Out</router-link>
    <br><br>
    <button @click="showAddListForm">Add New List</button>
    <ul class="lists-wrap">
      <TaskList
        v-for="todoList in todoLists"
        :key="todoList.listId"
        :listId="todoList.listId"
        :listTitle="todoList.listTitle"
        :tasks="todoList.tasks"
        @removeList1="removeList"
        @addTaskToList="addTask"
        @removeTask="onRemoveTask(todoList.listId, $event)"
        @changeTaskState="updateTaskState(todoList.listId, $event)"
      />
    </ul>
    <CreateList
      v-if="createListView"
      @getListTitle="addNewList"
      @closeForm="hideAddListForm"
    />
  </div>
</template>

<script>
import TaskList from '@/components/TaskList.vue';
import CreateList from '@/components/CreateList.vue';

export default {
  name: 'Home',
  data: () => ({
    createListView: false,
    todoLists: [
      // {
      //   listId: 'listId',
      //   listTitle: 'listTitle',
      //   tasks: [{
      //     taskId: 'taskId',
      //     taskState: true,
      //     taskText: 'taskText7',
      //   }],
      // },
    ],
  }),
  components: {
    CreateList,
    TaskList,
  },
  methods: {
    addNewList(listTitle) {
      this.todoLists.unshift({
        listId: `LId-${this.generateID()}`,
        listTitle,
        tasks: [],
      });
      this.hideAddListForm();
    },
    removeList(listId) {
      const listIndex = this.todoLists.findIndex((list) => list.listId === listId);
      this.todoLists.splice(listIndex, 1);
    },
    showAddListForm() {
      this.createListView = true;
    },
    hideAddListForm() {
      this.createListView = false;
    },
    addTask(task) {
      const editedList = this.todoLists.find((list) => list.listId === task.listId);
      editedList.tasks.unshift(
        {
          taskId: `TId-${this.generateID()}`,
          taskState: false,
          taskText: task.taskText,
        },
      );
    },
    onRemoveTask(listId, taskId) {
      const editedList = this.todoLists
        .find((list) => list.listId === listId);
      const taskIndex = editedList.tasks
        .findIndex((list) => list.taskId === taskId);
      editedList.tasks.splice(taskIndex, 1);
    },
    updateTaskState(listId, taskId) {
      const editedList = this.todoLists
        .find((list) => list.listId === listId);
      const taskIndex = editedList.tasks
        .findIndex((list) => list.taskId === taskId);
      editedList.tasks[taskIndex].taskState = !editedList.tasks[taskIndex].taskState;
    },
    generateID() {
      return (new Date() - Math.random()).toString(36).substr(1, 9);
    },
  },
};
</script>

<style scoped lang="scss">
  ul {
    padding: 0;
  }
  .home {
    margin: 30px auto;
    max-width: 1200px;
  }
  .log-out {
    float: right;
    cursor: pointer;
    padding: 5px;
    color: inherit;
    font-size: 13.3333px;
    text-decoration: none;
    background-color: #efefef;
    border: 1px outset rgb(133, 133, 133);
    border-radius: 3px;
    margin-right: 10px;
  }
  button {
    cursor: pointer;
    padding: 5px;
  }
</style>
