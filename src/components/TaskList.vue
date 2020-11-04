<template>
  <div class="wrap">
    <div class="title-wrap">
      <button
        type="button"
        class="remove-list-btn"
        @click="onRemoveList"
      >Remove list</button>
      <h2> {{ todoList.listTitle }} </h2>
    </div>
    <CreateTask
      @getTask="onGetTask"
    />
    <ul>
      <Task
        v-for="task in todoList.tasks"
        :key="task.taskId"
        :taskId="task.taskId"
        :taskState="task.taskState"
        :taskText="task.taskText"
        :listId="todoList.listId"
        @clickDeltTaskBtn1="onClickDeltTaskBtn2"
        @clickChangTaskState1="onClickChangTaskState2"
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
    onGetTask(taskTxt) {
      this.$emit('addTaskToList', {
        taskText: taskTxt,
        listId: this.todoList.listId,
      });
    },
    onRemoveList() {
      this.$emit('removeList1', this.todoList.listId);
    },
    onClickDeltTaskBtn2(taskIdentifiers) {
      this.$emit('clickDeltTaskBtn3', taskIdentifiers);
    },
    onClickChangTaskState2(taskIdentifiers) {
      this.$emit('clickChangTaskState3', taskIdentifiers);
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
