<template>
  <div>
    <form class="form-signin" v-on:submit="updateCompany">
      <p for="name">Enter user details</p>

      <div class="form-label-group">
        <input
          type="text"
          id="username"
          class="form-control"
          placeholder="Username"
          v-model="user.username"
          required
        />
      </div>

      <div class="form-label-group">
        <input
          type="password"
          id="password"
          class="form-control"
          placeholder="Password"
          v-model="user.password"
          required
        />
      </div>

      <div class="form-label-group">
        <select id="select-types" name="select-types" v-model="user.userType">
          <option v-for="type in this.userTypes" :key="type.id" :value="type.id">{{ type.type }}</option>
        </select>
      </div>

      <div class="error-div" v-if="showErrorMsg">
        <p class="error-msg">{{ this.errorMsg }}</p>
      </div>

      <br />

      <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit">Create</button>
    </form>
    <button
      id="close-btn"
      class="btn btn-lg btn-danger btn-block text-uppercase"
      v-on:click="closeForm"
    >Close</button>
  </div>
</template>

<script>
import UserClient from '../fetch_data/users/users-client.js'

export default {
  name: "UserCreateForm",

  methods: {
    updateCompany (e) {
      e.preventDefault();

      if (this.user.password.length >= 6 && this.isAlphaNumeric(this.user.password)) {
        UserClient.createUser(this.user.username, this.user.password, this.user.userType);

        this.user.username = "";
        this.user.password = "";
        this.user.userType = "1";

        return false;
      }

      alert("Password must contains characters and digits and length must be greater than 6. " + this.user.password);
      return false;
    },
    closeForm () {
      this.$parent.showUserForm = false;
    },

    isAlphaNumeric (string) {
      return /\d/.test(string) && /[a-zA-Z]/.test(string)
    }
  },

  data () {
    return {
      user: {
        username: "",
        password: "",
        userType: "1"
      },
      errorMsg: "This name already exists in database! Pick another one.",
      showErrorMsg: false
    }
  },

  created () {
    UserClient.loadUserTypes(this.$parent);
  },

  props: ['userTypes']

}
</script>

<style scoped>
p {
  font-size: 25px;
}

input {
  font-size: 25px;
}

#close-btn {
  margin-top: 10px;
}

input {
  margin-bottom: 10px;
}

select {
  margin-top: 20px;
  width: 100%;
  height: 50px;
  font-size: 24px;
}
</style>