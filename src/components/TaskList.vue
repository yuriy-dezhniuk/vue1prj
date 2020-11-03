<template>
  <div class="wrap">
    <CreateTask
      :todoList="todoList"
      @getTask="onGetTask"
      @removeList0="onRemoveList"
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
  props: ['todoList'],
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrap {
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
</style>
