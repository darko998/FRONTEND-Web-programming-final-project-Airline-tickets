<template>
  <div>
    <Header v-bind:userData="this.userData" />
    <h1>Available tickets</h1>
    <TicketsList v-bind:tickets="this.tickets" />
  </div>
</template>



<script>
import TicketsList from '../components/TicketsList.vue'
import Header from '@/views/Header'

export default {
  name: "Home",

  components: {
    TicketsList,
    Header
  },
  methods: {
  },
  data () {
    return {
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