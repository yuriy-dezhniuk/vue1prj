<template>
  <div class="login-body">
    <div class="wrapper">
      <div class="fullscreen">
        <div class="fullscreen-body">
          <div class="wrap">
            <h1>Sign In</h1>
            <p>
              Don’t have an account, please
              <router-link to="/signup">Sign Up</router-link>
            </p>
            <form @submit.prevent="signIn">
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
                type="submit"
                class="sign-in"
              >Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data: () => ({
    userEmail: '',
    userPassword: '',
  }),
  methods: {
    signIn() {
      const emaiRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (
        emaiRegExp.test(this.userEmail)
        && this.userPassword.trim()
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
  .login-body {
    height: 100%;
    & .wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      & .fullscreen {
        display: flex;
        min-height: 100vh;
        & .fullscreen-body {
          flex: 1 1 auto;
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
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
