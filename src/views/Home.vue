<template>
  <div>
    <Header v-bind:userData="this.userData" />
    <h1>Available tickets</h1>
    <TicketsList v-bind:tickets="this.tickets" />
  </div>
</template>



<script>
import TicketsList from '../components/TicketsList.vue'
import Header from '@/components/Header'

export default {
  name: "Home",

  components: {
    TicketsList,
    Header
  },
  methods: {
    /** Method which delete one ticket from tickets. Which we use to update home page when some
     * ticket is deleted.
     */
    deleteTicket (id) {
      let tmpTickets = [];
      let k = 0;

      for (let i in this.tickets) {
        if (this.tickets[i].id == id)
          continue;
        tmpTickets[k] = this.tickets[i]
        k++;
      }

      this.tickets = tmpTickets;
    }
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