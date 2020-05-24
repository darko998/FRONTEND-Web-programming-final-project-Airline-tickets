<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {

  name: 'App',
  components: {
  },
  created () {
    if (window.localStorage.getItem('jwt') == undefined) {
      this.$router.push({ name: 'login' })
    }
  }

}
</script>

<style>
#app {
  text-align: center;
  width: 100%;
  height: 100% !important;
}
</style>
