<template>
  <div>
    <form class="form-signin" v-on:submit="updateCompany">
      <p for="name">Enter new company name</p>

      <div class="form-label-group">
        <input
          type="text"
          id="name"
          class="form-control"
          placeholder="Company name"
          v-model="company.newName"
          required
          autofocus
        />
      </div>

      <div class="error-div" v-if="showErrorMsg">
        <p class="error-msg">{{ this.errorMsg }}</p>
      </div>

      <br />

      <button class="btn btn-lg btn-success btn-block text-uppercase" type="submit">Save</button>
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
  name: "CompanyEditForm",

  methods: {
    updateCompany (e) {
      e.preventDefault();

      let version = this.findCompanyById(this.$parent.company.companyId).version;
      CompaniesClient.updateCompany(this.company.newName, version, this);

      return false;
    },
    closeForm () {
      this.$parent.showForm = false;
    },
    findCompanyById (id) {
      let tmpCompanies = this.$parent.companies;

      for (let i in tmpCompanies) {
        if (tmpCompanies[i].id == id)
          return tmpCompanies[i];
      }
    }
  },

  data () {
    return {
      company: {
        newName: ""
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