<template>
  <div>
    <Header v-bind:userData="this.userData" />

    <h1>User: {{ this.userData.username }}</h1>
    <UserTickets v-bind:tickets="this.tickets" />
  </div>
</template>

<script>
import UserTickets from '../components/UserTickets.vue'
import Header from '@/components/Header'



export default {
  name: "UserPage",

  components: {
    Header,
    UserTickets
  },

  created () {
    this.id = this.$route.params.id
    this.userData.username = localStorage.getItem("username");
  },

  data () {
    return {
      id: "",
      tickets: [],
      userData: {
        isUserLoggedIn: true,
        username: localStorage.getItem('username'),
        userType: localStorage.getItem('userType'),
        reservationCount: 0
      },
    }
  }

}
</script>

<style scoped>
h1 {
  margin-top: 50px;
  margin-bottom: 70px;
}
</style>