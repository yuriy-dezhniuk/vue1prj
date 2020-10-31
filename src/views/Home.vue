<template>
  <div class="home">
    <!-- <button class="log-out">Log Out</button> -->
    <router-link to="/signin" class="log-out">Log Out</router-link>
    <br><br>
    <button @click="showAddListForm">Add New List</button>
    <ul class="lists-wrap">
      <TaskList
        @removeList1="removeList"
        @addTaskToList="addTask"
        @onClickDeltTaskBtn3="removeTask"
        v-for="todoList in todoLists"
        :key="todoList.listId"
        :todoList="todoList"
      />
    </ul>
    <CreateList
      v-if="createListView"
      @getListTitle="addNewList"
      @onCloseForm="hideAddListForm"
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
      const emptyStr = /(^\s{1,}$)|(^.{0}$)/;
      if (!listTitle.match(emptyStr)) {
        this.todoLists.unshift(
          {
            listId: `LId-${this.generateID()}`,
            listTitle,
            tasks: [],
          },
        );
        this.hideAddListForm();
      } else {
        alert('Title should not be empty');
      }
    },
    removeList(listId) {
      const listIndex = this.todoLists.findIndex((list) => list.listId === listId);
      this.todoLists.splice(listIndex, 1);
      console.log('remove');
    },
    showAddListForm() {
      this.createListView = true;
    },
    hideAddListForm() {
      this.createListView = false;
    },
    addTask(task) {
      const emptyStr = /(^\s{1,}$)|(^.{0}$)/;
      if (!task.taskText.match(emptyStr)) {
        const listIndex = this.todoLists.findIndex((list) => list.listId === task.listId);
        this.todoLists[listIndex].tasks.unshift(
          {
            taskId: `TId-${this.generateID()}`,
            taskState: false,
            taskText: task.taskText,
          },
        );
      } else {
        alert('Task should not be empty');
      }
    },
    removeTask(taskIdentifiers) {
      const listIndex = this.todoLists
        .findIndex((list) => list.listId === taskIdentifiers.listId);
      const taskIndex = this.todoLists[listIndex].tasks
        .findIndex((list) => list.taskId === taskIdentifiers.taskId);
      this.todoLists[listIndex].tasks.splice(taskIndex, 1);
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
  }
  button {
    cursor: pointer;
    padding: 5px;
  }
</style>
