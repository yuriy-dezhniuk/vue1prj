<template>
  <li :class="{done: task.taskState}">
    <div>
      <input
        type="checkbox"
        v-model="task.taskState"
      >
      <span class="title">
        {{task.taskText}}
      </span>
    </div>
    <button
      class="item-btn"
      @click="onClickDeltTaskBtn"
    >Delete</button>
  </li>
</template>

<script>
export default {
  name: 'Task',
  props: ['task', 'listId'],
  methods: {
    onClickDeltTaskBtn() {
      this.$emit('onClickDeltTaskBtn1', {
        taskId: this.task.taskId,
        listId: this.listId,
      });
    },
    // clickOnCheckbox() {
    //   this.btnDisable = !this.btnDisable;
    // },
  },
};
</script>

<style scoped lang="scss">
  .btn-disable {
    cursor: not-allowed;
    pointer-events: none;
    color: #c0c0c0;
    background-color: #ffffff;
  }
  .done {
    background: lightgreen;
  }
  li {
    list-style-type: none;
    border-bottom:  1px solid gray;
    padding: 1rem 10px 2.5rem 10px;
    text-align: justify;
    & .linethrough {
      text-decoration: line-through;
    }
    & .item-btn {
      border-radius: 3px;
      max-height: 35px;
      margin-left: 10px;
      margin-top: 5px;
      cursor: pointer;
      float: right;
    }
    & .item-btn:hover {
      filter: invert(10%);
    }
    & input[type="text"] {
      margin: 0 10px 10px 0;
      border-radius: 3px;
      padding-left: 10px;
      padding: 5px;
      width: 90%;
    }
    & input[type="checkbox"] {
      margin-right: 10px;
    }
  }
  li:last-child {
    border-bottom:  0;
    border-radius: 0 0 3px 3px;
  }
</style>
