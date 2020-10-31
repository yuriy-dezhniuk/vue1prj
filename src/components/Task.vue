<template>
  <li :class="{done: task.taskState}">
    <input
      v-focus
      type="text"
      placeholder="What needs to be done?"
      v-if="!saveEditBtnsVisibility"
      v-model="task.taskText"
      @keyup.enter="saveEditedTask"
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
  directives: {
    focus: {
    // определение директивы
      inserted(el) {
        el.focus();
      },
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
