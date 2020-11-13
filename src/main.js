import firebase from 'firebase';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import firebase from 'firebase';

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
  },
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
