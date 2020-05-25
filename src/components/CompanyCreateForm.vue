<template>
  <div>
    <form class="form-signin" v-on:submit="createCompany">
      <p for="name">Enter company name</p>

      <div class="form-label-group">
        <input
          type="text"
          id="name"
          class="form-control"
          placeholder="Company name"
          v-model="company.name"
          required
        />
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
import CompaniesClient from '../fetch_data/companies/companies-client.js'

export default {
  name: "CompanyCreateForm",

  methods: {
    createCompany (e) {
      e.preventDefault();

      CompaniesClient.createCompany(this.company.name, this);

      this.company.name = "";

      return false;
    },
    closeForm () {
      this.$parent.showCompanyForm = false;
    }
  },

  data () {
    return {
      company: {
        name: ""
      },
      errorMsg: "This name already exists in database! Pick another one.",
      showErrorMsg: false
    }
  }

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
</style>