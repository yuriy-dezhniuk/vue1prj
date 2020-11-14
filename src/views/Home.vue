<template>
  <div class="home">
    <span @click="logout">
      <router-link to="/signin" class="log-out">Log Out</router-link>
    </span>
    <br><br>
    <button @click="showAddListForm">Add New List</button>
    <ul class="lists-wrap">
      <TaskList
        v-for="todoList in todoLists"
        :key="todoList.id"
        :listId="todoList.id"
        :listTitle="todoList.title"
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

  }),
  components: {
    CreateList,
    TaskList,
  },
  computed: {
    todoLists() {
      return this.$store.state.todoLists;
    },
  },
  methods: {
    addNewList(listTitle) {
      this.$store.commit('addNewList', listTitle);
      this.hideAddListForm();
    },
    showAddListForm() {
      this.createListView = true;
    },
    hideAddListForm() {
      this.createListView = false;
    },
    logout() {
      this.$store.dispatch('logout');
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
