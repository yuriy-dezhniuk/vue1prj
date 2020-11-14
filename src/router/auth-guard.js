import store from '../store';

export default function (to, from, next) {
  if (store.state.user) {
    next();
  } else {
    next('/signin');
    console.log(store.state.user);
  }
}
