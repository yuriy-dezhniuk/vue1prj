<template>
  <div>
    <CreateTask
      @getTask="onGetTask"
      @removeList0="onRemoveList"
      :todoList="todoList"
    />
    <ul>
      <Task
        v-for="task in todoList.tasks"
        :key="task.taskId"
        :task="task"
        :listId="todoList.listId"
        @onClickDeltTaskBtn1="onClickDeltTaskBtn2"
      />
    </ul>
  </div>
</template>

<script>
import Task from '@/components/Task.vue';
import CreateTask from '@/components/CreateTask.vue';

export default {
  name: 'TaskList',
  components: {
    Task,
    CreateTask,
  },
  methods: {
    onGetTask(task) {
      this.$emit('addTaskToList', task);
    },
    onRemoveList(listId) {
      this.$emit('removeList1', listId);
    },
    onClickDeltTaskBtn2(taskIdentifiers) {
      this.$emit('onClickDeltTaskBtn3', taskIdentifiers);
    },
  },
  props: ['todoList'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  max-width: 1020px;
  background: lightgray;
  margin: 0 auto;
  padding: 0;
}
</style>
