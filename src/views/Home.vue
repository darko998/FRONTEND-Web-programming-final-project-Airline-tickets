<template>
  <div>
    <h1>Available tickets</h1>
    <TicketsList v-bind:tickets="this.tickets" />
  </div>
</template>



<script>
import TicketsList from '../components/TicketsList.vue'

export default {
  name: "Home",

  components: {
    TicketsList
  },
  methods: {
  },
  data () {
    return {
      tickets: []
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