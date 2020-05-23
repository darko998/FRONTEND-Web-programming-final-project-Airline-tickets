<template>
  <div>
    <Header v-bind:userData="this.userData" />

    <h1>{{ companyName }}</h1>
    <CompanyTickets v-bind:tickets="this.tickets" />
  </div>
</template>

<script>
import CompanyClient from '../fetch_data/companies/companies-client.js'
import CompanyTickets from '../components/CompanyTickets.vue'
import Header from '@/components/Header'



export default {
  name: "CompanyPage",

  components: {
    Header,
    CompanyTickets
  },

  created () {
    this.id = this.$route.params.id
    CompanyClient.getCompanyNameById(this.id, this);
  },

  data () {
    return {
      id: "",
      companyName: "",
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