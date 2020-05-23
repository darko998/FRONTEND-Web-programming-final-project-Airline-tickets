<template>
  <div class="header-backgorund">
    <div class="logo">
      <img src="../assets/logo.png" />
    </div>

    <div class="header-title">
      <h2>Frontend Project Darko Dimitrijevic RN 94/18</h2>
    </div>

    <div class="header-user-book-num" v-if="userData.isUserLoggedIn">
      <h2>{{ this.userData.reservationCount }}</h2>

      <svg
        class="bi bi-inbox"
        width="3em"
        height="3em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M3.81 4.063A1.5 1.5 0 014.98 3.5h6.04a1.5 1.5 0 011.17.563l3.7 4.625a.5.5 0 01-.78.624l-3.7-4.624a.5.5 0 00-.39-.188H4.98a.5.5 0 00-.39.188L.89 9.312a.5.5 0 11-.78-.624l3.7-4.625z"
          clip-rule="evenodd"
        />
        <path
          fill-rule="evenodd"
          d="M.125 8.67A.5.5 0 01.5 8.5H6a.5.5 0 01.5.5 1.5 1.5 0 003 0 .5.5 0 01.5-.5h5.5a.5.5 0 01.496.562l-.39 3.124a1.5 1.5 0 01-1.489 1.314H1.883a1.5 1.5 0 01-1.489-1.314l-.39-3.124a.5.5 0 01.121-.393zm.941.83l.32 2.562a.5.5 0 00.497.438h12.234a.5.5 0 00.496-.438l.32-2.562H10.45a2.5 2.5 0 01-4.9 0H1.066z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <div class="header-username" v-if="userData.isUserLoggedIn">
      <svg
        class="bi bi-people-circle"
        width="3em"
        height="3em"
        viewBox="0 0 16 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 008 15a6.987 6.987 0 005.468-2.63z"
        />
        <path fill-rule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
        <path
          fill-rule="evenodd"
          d="M8 1a7 7 0 100 14A7 7 0 008 1zM0 8a8 8 0 1116 0A8 8 0 010 8z"
          clip-rule="evenodd"
        />
      </svg>
      <h3>{{ this.userData.username }}</h3>
      <h5>{{ this.userData.userType }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",

  data () {
    return {
      isUserLoggedIn: true,
    }
  },

  props: ['userData'],

}
</script>

<style scope>
.header-backgorund {
  width: 100%;
  height: 150px;
  background: rgba(116, 189, 231, 0.959);
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
}

.logo {
  float: left;
  margin-left: 100px;
}

img {
  width: 150px;
  height: 150px;
}

.header-title {
  float: left;
  margin-top: 50px;
}

.header-username {
  float: right;
  margin-top: 30px;
  margin-right: 60px;
}

.header-user-book-num {
  float: right;
  margin-top: 40px;
  margin-right: 80px;
}
</style>