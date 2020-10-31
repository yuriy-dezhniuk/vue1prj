<template>
  <div @click="closeForm" class="fullscreen">
    <form v-on:submit.prevent="">
      <input
        v-focus
        type="text"
        v-model="listTitle"
        placeholder="Ente the list name"
        @keyup.enter="onClick"
      >
      <button @click="onClick">Create List</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CreateTask',
  data: () => ({
    listTitle: '',
  }),
  methods: {
    onClick() {
      this.$emit('getListTitle', this.listTitle);
      this.listTitle = '';
    },
    closeForm(e) {
      if (e.target.className === 'fullscreen') {
        this.$emit('onCloseForm');
      }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .fullscreen {
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    & form {
      flex-grow: 1;
      border-radius: 3px;
      max-width: 500px;
      padding: 50px 20px;
      background: #fff;
      display: flex;
      justify-content: space-between;
      & button {
        cursor: pointer;
        height: 34px;
        margin-left: 20px;
      }
      & input {
        height: 30px;
        flex-grow: 1;
        margin: 0;
        padding: 0 0 0 10px;
      }
    }
  }
</style>
