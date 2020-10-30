<template>
    <form v-on:submit.prevent="">
      <div class="title-wrap">
        <button
          class="remove-list-btn"
          @click="onClickRemoveListBtn"
        >Remove list</button>
        <h2> {{ todoList.listTitle }} </h2>
      </div>
      <div class="input-wrap">
        <input
          type="text"
          v-model="taskText"
          placeholder="What needs to be done?"
          @keyup.enter="createTask"
        >
        <button
          @click="createTask"
          class="create-task-btn"
        >
          Create
        </button>
      </div>
    </form>
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
      // console.log(this.todoList.listId);
      this.$emit('removeList0', this.todoList.listId); debugger;
    },
  },
  props: ['todoList'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
form {
  background: lightgray;
  border-radius: 3px 3px 0 0;
  max-width: 1000px;
  margin: 20px auto 0 auto;
  padding: 10px;
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
  .input-wrap {
    display: flex;
    justify-content: space-between;
    & input {
      flex-grow: 1;
      margin-right: 10px;
    }
    & .create-task-btn {
      // flex: 0 1 auto;
    }
  }
}
// ul {
//   max-width: 1020px;
//   background: lightgray;
//   margin: 0 auto;
//   padding: 0;
// }
</style>
