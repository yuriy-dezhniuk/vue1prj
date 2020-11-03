<template>
  <div @click="closeForm" class="fullscreen">
    <form @submit.prevent="onClick">
      <input
        v-focus
        type="text"
        v-model="listTitle"
        placeholder="Ente the list name"
      >
      <button type="submit">Create List</button>
    </form>
  </div>
</template>

<script>
import onfocus from '@/directives/focus.vue';

export default {
  name: 'CreateTask',
  data: () => ({
    listTitle: '',
  }),
  methods: {
    onClick() {
      if (this.listTitle.trim()) {
        this.$emit('getListTitle', this.listTitle);
        this.listTitle = '';
      } else {
        alert('Title should not be empty');
      }
    },
    closeForm(e) {
      // if (e.target.className === 'fullscreen') {
      //   this.$emit('onCloseForm');
      // }
      if (e.target === e.currentTarget) {
        this.$emit('onCloseForm');
      }
    },
  },
  directives: {
    focus: onfocus,
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
