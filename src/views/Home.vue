<template>
  <div class="home">
    <button class="log-out">Log Out</button><br>
    <button
      class="add-list"
      @click="showAddListForm"
    >Add New List</button>
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
  .home {
    margin: 30px auto;
    max-width: 1200px;
    // position: relative;
  }
  .log-out {
    float: right;
    // position: absolute;
    // right: 3%;
    // top: 10px;
  }
  button {
    cursor: pointer;
  }
  .add-list {
    margin-top: 25px;
  }

</style>
