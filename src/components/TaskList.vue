<template>
  <div class="wrap">
    <div class="title-wrap">
      <button
        type="button"
        class="remove-list-btn"
        @click="onRemoveList"
      >Remove list</button>
      <h2> {{ listTitle }} </h2>
    </div>
    <CreateTask
      @getTask="onGetTask"
    />
    <ul>
      <Task
        v-for="task in tasks"
        :key="task.taskId"
        :taskState="task.taskState"
        :taskText="task.taskText"
        @removeTask="onRemoveTask(task.taskId)"
        @changeTaskState="onChangeTaskState(task.taskId)"
      />
    </ul>
  </div>
</template>

<script>
import Task from '@/components/Task.vue';
import CreateTask from '@/components/CreateTask.vue';

export default {
  name: 'TaskList',
  props: ['listId', 'listTitle'],
  components: {
    Task,
    CreateTask,
  },
  computed: {
    tasks() {
      return this.$store.state.tasks[this.listId];
    },
  },
  methods: {
    onGetTask(taskTxt) {
      this.$store.dispatch('createTask', {
        taskText: taskTxt,
        listId: this.listId,
      });
    },
    onRemoveList() {
      this.$store.dispatch('removeList', this.listId);
    },
    onRemoveTask(taskId) {
      this.$store.dispatch('removeTask', { taskId, listId: this.listId });
    },
    onChangeTaskState(taskId) {
      this.$store.dispatch('updateTaskState', { taskId, listId: this.listId });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap {
  background: lightgray;
  padding: 5px 0 15px 0;
  max-width: 900px;
  border-radius: 3px 3px 0 0;
  margin: 20px auto 0 auto;
}
ul {
  max-width: 920px;
  background: lightgray;
  margin: 0 auto;
  padding: 0;
  border-radius: 0 0 3px 3px;
}
.title-wrap {
  padding: 10px;
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
button {
  cursor: pointer;
}
</style>
