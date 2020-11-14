import firebase from 'firebase';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDbEVZJNpyBvG96lwoiGPzB6LQJECDjohc',
      authDomain: 'vue1prj.firebaseapp.com',
      databaseURL: 'https://vue1prj.firebaseio.com',
      projectId: 'vue1prj',
      storageBucket: 'vue1prj.appspot.com',
      messagingSenderId: '529368896699',
      appId: '1:529368896699:web:c545d3ed6ec3a1f66e459e',
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
        // this.$store.dispatch('loadLists');
        // this.$store.dispatch('loadTasks');
      } else {
        // this.$store.commit('resetStore');
      }
    });
    window.firebase = firebase;
  },
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
