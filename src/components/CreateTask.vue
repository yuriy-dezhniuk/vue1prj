<template>
  <div class="wrap">
    <div class="title-wrap">
      <button
        class="remove-list-btn"
        @click="onClickRemoveListBtn"
        type="button"
      >Remove list</button>
      <h2> {{ todoList.listTitle }} </h2>
    </div>
    <form v-on:submit.prevent="createTask">
        <input
          type="text"
          v-model="taskText"
          placeholder="What needs to be done?"
        >
        <button
          class="create-task-btn"
        >
          Create
        </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateTask',
  data: () => ({
    taskText: '',
  }),
  methods: {
    createTask() {
      this.$emit('getTask', {
        taskText: this.taskText,
        listId: this.todoList.listId,
      });
      this.taskText = '';
    },
    onClickRemoveListBtn() {
      this.$emit('removeList0', this.todoList.listId);
    },
  },
  props: ['todoList'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap {
  max-width: 900px;
  margin: 10px auto 0 auto;
  padding: 5px 10px 15px 10px;
  background: lightgray;
  & button {
    border-radius: 3px;
    cursor: pointer;
  }
  & button:hover {
    filter: invert(10%);
  }
    & .title-wrap {
    padding: 10px 0;
    & .remove-list-btn {
      height: 30px;
      float: right;
      margin-left: 10px;
    }
    & h2 {
      margin: 0;
      text-align: justify;
    }
  }
}
form {
  display: flex;
  justify-content: space-between;
  & input {
    flex-grow: 1;
    margin-right: 10px;
    padding: 5px;
    border-radius: 3px;
  }
}
</style>
