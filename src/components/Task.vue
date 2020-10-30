<template>
  <li :class="{done: task.taskState}">
    <input
      type="text"
      placeholder="What needs to be done?"
      v-if="!saveEditBtnsVisibility"
      v-model="task.taskText"
    >
    <div>
      <input
        type="checkbox"
        v-model="task.taskState"
        @change="clickOnCheckbox"
      >
      <span class="title">
        {{task.taskText}}
      </span>
    </div>
    <button
      class="item-btn"
      :class="{'btn-disable': btnDisable}"
      v-if="saveEditBtnsVisibility"
      @click="showEditingElements"
    >Edit</button>
    <button
      class="item-btn"
      v-if="!saveEditBtnsVisibility"
      @click="saveEditedTask"
    >Save</button>
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
  data: () => ({
    saveEditBtnsVisibility: true,
    btnDisable: false,
  }),
  methods: {
    onClickDeltTaskBtn() {
      this.$emit('onClickDeltTaskBtn1', {
        taskId: this.task.taskId,
        listId: this.listId,
      });
    },
    showEditingElements() {
      this.saveEditBtnsVisibility = false;
    },
    saveEditedTask() {
      const emptyStr = /(^\s{1,}$)|(^.{0}$)/;
      if (!this.task.taskText.match(emptyStr)) {
        this.saveEditBtnsVisibility = true;
      } else {
        alert('Task should not be empty, enter data or delete task');
      }
    },
    clickOnCheckbox() {
      this.btnDisable = !this.btnDisable;
    },
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
    margin: 0 10px 10px 10px;
    border-bottom:  1px solid gray;
    padding: 1rem 0 2.5rem 0;
    text-align: justify;
    & .linethrough {
      text-decoration: line-through;
    }
    // & .indicator::after {
    //   content: "\2013";
    //   padding: 0 10px;
    //   border: 1px solid red;
    //   background-color: pink;
    //   border-radius: 3px;
    //   margin-right: 10px;
    // }
    // & .indicator.done::after {
    //   content: "\2713";
    //   padding: 0 8px;
    //   border: 1px solid green;
    //   background-color: lightgreen;
    // }
    & .item-btn {
      // border: 1px solid lightgray;
      border-radius: 3px;
      // padding: 10px;
      // color: gray;
      max-height: 35px;
      margin-left: 10px;
      cursor: pointer;
      float: right;
    }
    & .item-btn:hover {
      filter: invert(10%);
    }
    & input[type="text"] {
      // flex-grow: 1;
      margin: 0 10px 10px 0;
      border-radius: 3px;
      // border: 1px solid lightgray;
      padding-left: 10px;
      padding: 10px;
      // font-size: 1rem;
      width: 90%;
    }
    & input[type="checkbox"] {
      margin-right: 10px;
    }
  }
</style>
