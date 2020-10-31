<template>
  <div class="login-body">
    <div class="wrapper">
      <div class="fullscreen">
        <div class="fullscreen-body">
          <signUpForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import signUpForm from '@/components/signUpForm.vue';

export default {
  name: 'SignUp',
  components: {
    signUpForm,
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
</style>
