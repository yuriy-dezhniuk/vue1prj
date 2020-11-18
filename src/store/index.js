import firebase from 'firebase';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// const defaultStore = {
//   user: null,
//   todoLists: [],
//   tasks: {},
// };

export default new Vuex.Store({
  state: {
    user: null,
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
    setUser(state, user) {
      state.user = user;
    },
    addNewList(state, list) {
      state.todoLists.unshift(list);
      Vue.set(state.tasks, list.id, []);
    },
    removeList(state, listId) {
      const listIndex = state.todoLists.findIndex((list) => list.id === listId);
      state.todoLists.splice(listIndex, 1);
      delete state.tasks[listId];
    },
    addTask(state, {
      taskText, listId, taskId, taskState,
    }) {
      state.tasks[listId].unshift({
        taskId,
        taskState,
        taskText,
      });
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
    resetStore(state) {
      // Object.keys(defaultStore).forEach((key) => {
      //   state[key] = defaultStore[key];
      // });
      state.user = null;
      state.todoLists = [];
      state.tasks = {};
    },
  },
  actions: {
    async signUserUp({ commit }, { email, password }) {
      const { user } = await firebase.auth()
        .createUserWithEmailAndPassword(email, password);
      const newUser = { id: user.uid };
      commit('setUser', newUser);
    },
    async signUserIn({ commit }, { email, password }) {
      const { user } = await firebase.auth()
        .signInWithEmailAndPassword(email, password);
      commit('setUser', { id: user.uid });
    },
    logout({ commit }) {
      commit('resetStore');
      firebase.auth().signOut();
    },
    autoSignIn(store, { uid }) {
      store.commit('setUser', { id: uid });
    },
    async createTaskList({ commit, state }, listTitle) {
      const userId = state.user.id;
      const data = await firebase.database().ref(`lists/${userId}`).push(listTitle);
      commit('addNewList', { id: data.key, title: listTitle });
    },
    async loadLists({ commit, state }) {
      const userId = state.user.id;
      const lists = await firebase.database().ref(`lists/${userId}`)
        .once('value').then((snapshot) => snapshot.val()) || {};
      const listsArr = Object.entries(lists);
      listsArr.forEach((list) => {
        commit('addNewList', { id: list[0], title: list[1] });
      });
    },
    async removeList({ commit, state }, listId) {
      const userId = state.user.id;
      await firebase.database().ref(`lists/${userId}/${listId}`).set(null);
      await firebase.database().ref(`tasks/${userId}/${listId}`).set(null);
      commit('removeList', listId);
    },
    async createTask({ commit, state }, { taskText, listId }) {
      const userId = state.user.id;
      const data = await firebase.database().ref(`tasks/${userId}/${listId}`)
        .push({ state: false, taskText });
      commit('addTask', {
        taskText,
        listId,
        taskId: data.key,
        taskState: false,
      });
    },
    async removeTask({ commit, state }, { taskId, listId }) {
      const userId = state.user.id;
      await firebase.database().ref(`tasks/${userId}/${listId}/${taskId}`).set(null);
      commit('removeTask', { taskId, listId });
    },
    async updateTaskState({ commit, state }, { taskId, listId }) {
      const userId = state.user.id;
      const task = state.tasks[listId].find((item) => item.taskId === taskId);
      await firebase.database()
        .ref(`tasks/${userId}/${listId}/${taskId}/state`).set(!task.taskState);
      commit('updateTaskState', { taskId, listId });
    },
    async loadTasks({ commit, state }) {
      const userId = state.user.id;
      const tasks = await firebase.database().ref(`tasks/${userId}`)
        .once('value').then((snapshot) => snapshot.val()) || {};
      const tasksArr = Object.entries(tasks);
      tasksArr.forEach((taskList) => {
        Object.entries(taskList[1]).forEach((item) => {
          commit('addTask', {
            taskText: item[1].taskText,
            listId: taskList[0],
            taskId: item[0],
            taskState: item[1].state,
          });
        });
      });
    },
  },
  modules: {
  },
});
