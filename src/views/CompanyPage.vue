<template>
  <div>
    <Header v-bind:userData="this.userData" />
    <div class="container-title-icons">
      <div class="div-title">
        <h1>{{ companyName }}</h1>
        <CompanyEditForm v-bind:company="this.company" v-if="showForm" />
      </div>
      <div class="div-icons">
        <!-- ICON FOR TICKET EDIT-->
        <div class="icon-edit">
          <span class="tooltiptext">Edit company</span>
          <svg
            class="bi bi-pencil-square"
            width="3.5em"
            height="3.5em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            v-on:click="editCompany"
          >
            <path
              d="M15.502 1.94a.5.5 0 010 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 01.707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 00-.121.196l-.805 2.414a.25.25 0 00.316.316l2.414-.805a.5.5 0 00.196-.12l6.813-6.814z"
            />
            <path
              fill-rule="evenodd"
              d="M1 13.5A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-6a.5.5 0 00-1 0v6a.5.5 0 01-.5.5h-11a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5H9a.5.5 0 000-1H2.5A1.5 1.5 0 001 2.5v11z"
              clip-rule="evenodd"
            />
          </svg>
        </div>

        <!-- ICON FOR TICKET DELETE-->
        <div class="icon-delete">
          <span class="tooltiptext">Delete company</span>

          <svg
            class="bi bi-archive"
            width="3.5em"
            height="3.5em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            v-on:click="deleteCompany"
          >
            <path
              fill-rule="evenodd"
              d="M2 5v7.5c0 .864.642 1.5 1.357 1.5h9.286c.715 0 1.357-.636 1.357-1.5V5h1v7.5c0 1.345-1.021 2.5-2.357 2.5H3.357C2.021 15 1 13.845 1 12.5V5h1z"
              clip-rule="evenodd"
            />
            <path
              fill-rule="evenodd"
              d="M5.5 7.5A.5.5 0 016 7h4a.5.5 0 010 1H6a.5.5 0 01-.5-.5zM15 2H1v2h14V2zM1 1a1 1 0 00-1 1v2a1 1 0 001 1h14a1 1 0 001-1V2a1 1 0 00-1-1H1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>

    <CompanyTickets v-bind:tickets="this.tickets" />
  </div>
</template>

<script>
import CompanyClient from '../fetch_data/companies/companies-client.js'
import CompanyTickets from '../components/CompanyTickets.vue'
import Header from '@/components/Header'
import CompanyEditForm from '@/components/CompanyEditForm'



export default {
  name: "CompanyPage",

  components: {
    Header,
    CompanyTickets,
    CompanyEditForm
  },

  created () {
    this.id = this.$route.params.id
    CompanyClient.getCompanyNameById(this.id, this);
    CompanyClient.loadCompanies(this);
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
      companies: [],
      company: {
        companyId: this.$route.params.id,
        companyName: "",
        version: ""
      },
      showForm: false
    }
  },

  methods: {
    editCompany () {
      this.showForm = true;
    },
    deleteCompany () {
      var r = confirm("Are you sure you want to delete this company?");
      if (r == true) {
        CompanyClient.deleteCompany(this.$route.params.id);
        this.$router.push({ name: 'home' })
      }

    },
    setNewVersion (id, version) {
      for (let i in this.companies) {
        if (this.companies[i].id == id) {
          console.log('---- ' + id);

          this.companies[i].version = version;
        }
      }


    }
  }

}
</script>

<style scoped>
h1 {
  margin-top: 50px;
  margin-bottom: 70px;
}

.div-icons {
  float: right;
  margin-top: 50px;
  margin-right: 100px;
}

.div-title {
  display: inline-block;
  margin-bottom: 50px;
}

.icon-edit {
  display: inline-block;
  margin-right: 10px;
}

.icon-delete {
  display: inline-block;
  margin-left: 30px;
}

.icon-edit:hover {
  transform: translateY(4px);
  cursor: pointer;
}

.icon-edit:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.icon-edit .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip - takes 1 second to go from 0% to 100% opac: */
  opacity: 0;
  transition: opacity 1s;
}

.icon-delete:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.icon-delete .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip - takes 1 second to go from 0% to 100% opac: */
  opacity: 0;
  transition: opacity 1s;
}

.icon-delete:hover {
  transform: translateY(4px);
  cursor: pointer;
}
</style>