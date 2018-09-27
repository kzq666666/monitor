<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    created() {
      if (!window.sessionStorage.token) {
        this.$router.push('/login');
      }
    }
  }

</script>

<style>
  * {
    padding: 0;
    margin: 0;
    list-style: none;
    text-decoration: none;
    
  }

  a {
    color: black;
  }

  em {
    color: red;
    font-style: normal;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  #app {
    height: 100%;
    min-width: 1410px;
  }
</style>