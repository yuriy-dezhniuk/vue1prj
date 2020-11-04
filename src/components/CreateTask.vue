<template>
  <form @submit.prevent="createTask" class="wrap">
    <input
      type="text"
      v-model="taskText"
      placeholder="What needs to be done?"
    >
    <button>Create</button>
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
      if (this.taskText.trim()) {
        this.$emit('getTask', this.taskText);
        this.taskText = '';
      } else {
        alert('Task should not be empty');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  max-width: 900px;
  margin: 10px auto 0 auto;
  padding: 5px 10px 15px 10px;
  background: lightgray;
  & button {
    border-radius: 3px;
    cursor: pointer;
    margin-right: 10px;
  }
  & button:hover {
    filter: invert(10%);
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
    margin-left: 10px;
  }
}
</style>
