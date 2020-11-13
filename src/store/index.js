import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todoLists: [
      // {
      //   id: '123',
      //   title: 'List title',
      // },
    ],
    tasks: {
      // '123': [
      //   {
      //     taskId: '',
      //     taskState: 'Task1',
      //     taskText: false,
      //   }
      // ],
    },
  },
  mutations: {
    addNewList(state, listTitle) {
      const id = `LId-${(new Date() - Math.random()).toString(36).substr(1, 9)}`;
      state.todoLists.unshift({
        id,
        title: listTitle,
      });
      Vue.set(state.tasks, id, []);
    },
    removeList(state, listId) {
      const listIndex = state.todoLists.findIndex((list) => list.id === listId);
      state.todoLists.splice(listIndex, 1);
      delete state.tasks[listId];
    },
    addTask(state, task) {
      state.tasks[task.listId].unshift(
        {
          taskId:
            `TId-${(new Date() - Math.random()).toString(36).substr(1, 9)}`,
          taskState: false,
          taskText: task.taskText,
        },
      );
    },
    removeTask(state, { taskId, listId }) {
      const tasksArr = state.tasks[listId];
      const taskIndex = tasksArr.findIndex((task) => task.taskId === taskId);
      tasksArr.splice(taskIndex, 1);
    },
    updateTaskState(state, { taskId, listId }) {
      const tasksArr = state.tasks[listId];
      const task = tasksArr.find((item) => item.taskId === taskId);
      task.taskState = !task.taskState;
    },
  },
  actions: {
  },
  modules: {
  },
});
