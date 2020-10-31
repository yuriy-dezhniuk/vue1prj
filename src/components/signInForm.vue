<template>
  <div class="wrap">
    <h1>Sign In</h1>
    <p>
      Don’t have an account, please
      <router-link to="/signup">Sign Up</router-link>
    </p>
  <form v-on:submit.prevent="">
    <input
      type="text"
      placeholder="Email"
      v-model="userEmail"
    >
    <input
      type="password"
      placeholder="Password"
      v-model="userPassword"
    >
    <button
      class="sign-in"
      @click="signIn"
    >Sign In</button>
  </form>
  </div>
</template>

<script>
export default {
  name: 'signInForm',
  data: () => ({
    userEmail: '',
    userPassword: '',
  }),
  methods: {
    signIn() {
      const emptyStr = /(^\s{1,}$)|(^.{0}$)/;
      const emaiRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (
        this.userEmail.match(emaiRegExp)
        && !this.userPassword.match(emptyStr)
      ) {
        alert('You are signed in');
      } else {
        alert('Incorrect username or password.');
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .wrap {
    -webkit-box-shadow: 0px 0px 5px 7px rgba(223,224,235,0.3);
    -moz-box-shadow: 0px 0px 5px 7px rgba(223,224,235,0.3);
    box-shadow: 0px 0px 5px 7px rgba(223,224,235,0.3);
    background: #fff;
    border-radius: 5px;
    text-align: center;
    padding: 20px 10px;
    max-width: 500px;
    & h1 {
      margin: 10 0;
    }
    & input {
      width: 90%;
      padding-left: 10px;
      border: 0;
      border-bottom: 1px solid lightgray;
      margin: 1rem 0;
      height: 25px;
    }
    & .sign-in {
      width: 150px;
      padding: 0.5rem;
      cursor: pointer;
      border: 1px solid lightgray;
      border-radius: 5px;
      background: #fff;
    }
    & .sign-in:hover {
      filter: invert(2%);
    }
    & a:hover {
      filter: invert(20%);
    }
  }
</style>
