<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/views/Header'


export default {

  name: 'App',
  components: {
    'Header': Header
  },

}
</script>

<style>
#app {
  text-align: center;
  width: 100%;
  height: 100%;
}
</style>
