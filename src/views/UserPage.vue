<template>
  <div class="main-container">
    <Header v-bind:userData="this.userData" />
    <h1>User: {{ this.userData.username }}</h1>

    <div class="container-title-icons">
      <div class="div-icons" v-if="currUserType === 'ADMINISTRATOR' || currUserType === 'FULL'">
        <!-- ICON FOR CREATING USER-->
        <div class="icon-create-user">
          <span class="tooltiptext">Create user</span>
          <svg
            class="bi bi-person-plus-fill"
            width="3.5em"
            height="3.5em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            v-on:click="createUser"
          >
            <path
              fill-rule="evenodd"
              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
            />
            <path
              fill-rule="evenodd"
              d="M13 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"
            />
          </svg>
        </div>

        <!-- ICON FOR CREATING COMPANY-->
        <div class="icon-create-company">
          <span class="tooltiptext">Create company</span>

          <svg
            class="bi bi-plus-square"
            width="3.5em"
            height="3.5em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            v-on:click="createCompany"
          >
            <path
              fill-rule="evenodd"
              d="M8 3.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z"
            />
            <path
              fill-rule="evenodd"
              d="M7.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8z"
            />
            <path
              fill-rule="evenodd"
              d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
            />
          </svg>
        </div>
      </div>
      <!-- FORM FOR CREATING NEW USER-->
      <div class="div-user-create-form">
        <UserCreateForm v-bind:userTypes="this.userTypes" v-if="showUserForm" />
      </div>
    </div>

    <!-- FORM FOR CREATING NEW COMPANY-->
    <div class="div-company-create-form">
      <CompanyCreateForm v-bind:company="this.company" v-if="showCompanyForm" />
    </div>

    <UserTickets v-bind:tickets="this.tickets" />
  </div>
</template>

<script>
import UserTickets from '../components/UserTickets.vue'
import Header from '@/components/Header'
import CompanyCreateForm from '@/components/CompanyCreateForm'
import UserCreateForm from '@/components/UserCreateForm'



export default {
  name: "UserPage",

  components: {
    Header,
    UserTickets,
    CompanyCreateForm,
    UserCreateForm
  },

  created () {
    this.currUserType = localStorage.getItem("userType");
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
      showCompanyForm: false,
      showUserForm: false,
      company: {
        companyName: ""
      },
      userTypes: [],
      currUserType: ""
    }
  },

  methods: {
    createUser () {
      this.showUserForm = true;
      this.showCompanyForm = false;
    },
    createCompany () {
      this.showCompanyForm = true;
      this.showUserForm = false;
    }
  }

}
</script>

<style scoped>
.div-company-create-form {
  display: inline-block;
  width: 45vh;
}

.div-user-create-form {
  display: inline-block;
  width: 45vh;
}
h1 {
  margin-bottom: 70px;
  margin-top: 70px;
}
.div-icons {
  margin: 20px;
}

.div-title {
  display: inline-block;
}

.icon-create-user {
  display: inline-block;
  margin-right: 10px;
  margin-top: 30px;
}

.icon-create-company {
  display: inline-block;
  margin-left: 30px;
  margin-top: 30px;
}

.icon-create-user:hover {
  transform: translateY(4px);
  cursor: pointer;
}

.icon-create-user:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.icon-create-user .tooltiptext {
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

.icon-create-company:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.icon-create-company .tooltiptext {
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

.icon-create-company:hover {
  transform: translateY(4px);
  cursor: pointer;
}
</style>