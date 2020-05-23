<template>
  <div>
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-16 col-md-12 col-lg-12" id="create_ticket_div">
          <h2 class="title">Create new ticket</h2>
          <br />
          <br />
          <!-- FORM -->
          <form id="form_create_ticket" class="col-lg-12 offset-lg-3" v-on:submit="createTicket">
            <!-- TICKET TYPE RADIO BUTTONS -->
            <fieldset class="form-group">
              <div class="row">
                <legend class="col-form-label col-sm-2 pt-0">
                  <p class="text">Ticket type</p>
                </legend>
                <div class="col-sm-10">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="true"
                      name="one_way"
                      value="true"
                      v-model="oneWay"
                      v-on:click="isReturnDateHidden = true"
                    />
                    <label class="form-check-label" for="true">One way</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="false"
                      name="one_way"
                      value="false"
                      v-model="oneWay"
                      v-on:click="isReturnDateHidden = false"
                    />
                    <label class="form-check-label" for="false">Return</label>
                  </div>
                </div>
              </div>
            </fieldset>
            <!-- FLIGHT SELECT-->
            <div class="form-group row">
              <label for="select-flight" class="col-sm-2 col-form-label">
                <p class="text">Flight</p>
              </label>
              <div class="col-sm-10">
                <select
                  id="select-flight"
                  name="select-flight"
                  v-model="flightId"
                  :disabled="!this.isFormForNewFlightHidden"
                >
                  <option
                    v-for="flight in this.flights"
                    :key="flight.id"
                    :value="flight.id"
                  >{{ getCityNameById(flight.originCityId) }} - {{ getCityNameById(flight.destinationCityId) }}</option>
                </select>

                <!-- ICON FOR NEW FLIGHT-->
                <div
                  class="icon-add-flight"
                  v-if="this.isFormForNewFlightHidden"
                  v-on:click="addNewFlight"
                >
                  <span class="tooltiptext">Create new flight</span>

                  <svg
                    class="bi bi-plus-square"
                    width="3em"
                    height="3em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
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

                <!-- ICON FOR COLLAPSE FORM FOR NEW FLIGHT-->
                <div
                  class="icon-add-flight"
                  v-if="!this.isFormForNewFlightHidden"
                  v-on:click="collapseFormForNewFlight"
                >
                  <span
                    class="tooltiptext"
                  >Collapse form for new ticket and choose flight from drop down</span>

                  <svg
                    class="bi bi-arrow-90deg-up"
                    width="3em"
                    height="3em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.646 6.854a.5.5 0 0 0 .708 0L6 4.207l2.646 2.647a.5.5 0 1 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 0 .708z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M6 3.5a.5.5 0 0 0-.5.5v6.5A2.5 2.5 0 0 0 8 13h5.5a.5.5 0 0 0 0-1H8a1.5 1.5 0 0 1-1.5-1.5V4a.5.5 0 0 0-.5-.5z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <!-- FROM-->
            <div class="form-group row" v-if="!this.isFormForNewFlightHidden">
              <label for="from" class="col-sm-2 col-form-label">
                <p class="text">From</p>
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="from"
                  name="from"
                  placeholder="From"
                  v-model="from"
                />
              </div>
            </div>
            <!-- TO-->
            <div class="form-group row" v-if="!this.isFormForNewFlightHidden">
              <label for="to" class="col-sm-2 col-form-label">
                <p class="text">To</p>
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="to"
                  name="to"
                  placeholder="To"
                  v-model="to"
                />
              </div>
            </div>
            <!-- DEPART DATE-->
            <div class="form-group row">
              <label for="depart_date" class="col-sm-2 col-form-label">
                <p class="text">Depart date</p>
              </label>
              <div class="col-sm-10">
                <input
                  type="datetime-local"
                  class="form-control"
                  id="depart_date"
                  name="depart_date"
                  placeholder="Depart date"
                  v-model="departDate"
                />
              </div>
            </div>
            <!-- RETURN DATE -->
            <div class="form-group row">
              <label for="return_date" class="col-sm-2 col-form-label">
                <p class="text">Return date</p>
              </label>
              <div class="col-sm-10">
                <input
                  type="datetime-local"
                  class="form-control"
                  id="return_date"
                  name="return_date"
                  placeholder="Return date"
                  v-model="returnDate"
                  :disabled="this.isReturnDateHidden"
                />
              </div>
            </div>
            <!-- TO-->
            <div class="form-group row">
              <label for="to" class="col-sm-2 col-form-label">
                <p class="text">Tickets number</p>
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  id="count"
                  name="count"
                  placeholder="Count"
                  v-model="count"
                />
              </div>
            </div>
            <!-- COMPANIES SELECT-->
            <div class="form-group row">
              <label for="select-companies" class="col-sm-2 col-form-label">
                <p class="text">Company</p>
              </label>
              <div class="col-sm-10">
                <select id="select-companies" name="select-companies" v-model="companyId">
                  <option
                    v-for="company in this.companies"
                    :key="company.id"
                    :value="company.id"
                  >{{ company.name }}</option>
                </select>
              </div>
            </div>
            <!-- SUBMIT BUTTON -->
            <div class="button-div">
              <button type="Submit" class="btn btn-success">Create ticket</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyClient from '../fetch_data/companies/companies-client.js'
import TicketClient from '../fetch_data/tickets/tickets-client.js'
import FlightClient from '../fetch_data/flights/flights-client.js'
import CityClient from '../fetch_data/cities/cities-client.js'

export default {
  name: "CrateTicket",

  data () {
    return {
      companies: [],
      flights: [],
      cities: [],
      oneWay: "true",
      from: "",
      to: "",
      departDate: "",
      returnDate: "",
      count: "",
      companyId: "",
      flightId: "",
      isReturnDateHidden: true,
      isFormForNewFlightHidden: true,

    }
  },

  created () {
    CompanyClient.loadCompanies(this);
    FlightClient.loadFlights(this);
    CityClient.loadCities(this);
  },

  methods: {
    createTicket (e) {
      e.preventDefault();


      /** I convert date-time local from input to milliseconds from 1970 */
      let convertedDepartDate = new Date(this.departDate).getTime();
      let convertedReturnDate = new Date(this.returnDate).getTime();

      TicketClient.createTicket(this.oneWay, this.from, this.to, convertedDepartDate, convertedReturnDate, this.count, this.companyId, this.flightId, this);

      this.oneWay = "true";
      this.from = "";
      this.to = "";
      this.departDate = "";
      this.returnDate = "";
      this.count = "";
      this.companyId = "";
      this.flightId = "";
      this.isReturnDateHidden = true;
      this.isFormForNewFlightHidden = true;



      return false;
    },

    refreshFlights () {
      FlightClient.loadFlights(this);
    },

    addNewFlight () {
      this.isFormForNewFlightHidden = false;
    },

    collapseFormForNewFlight () {
      this.isFormForNewFlightHidden = true;

    },

    getCityNameById (id) {
      for (let i in this.cities) {
        if (this.cities[i].id === id)
          return this.cities[i].name
      }
      return "None";
    }
  }



}
</script>

<style scoped>
.icon-add-flight {
  float: left;
  margin-left: 40px;
}

.icon-add-flight:hover {
  float: left;
  margin-left: 40px;
  transform: translateY(5px);
}

.icon-add-flight .tooltiptext {
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

.icon-add-flight {
  display: inline-block;
}

.icon-add-flight:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
.button-div {
  text-align: center !important;
}
button {
  width: 20vh;
  font-size: 30px;
  margin-right: 30vh;
  margin-bottom: 20px;
  margin-top: 50px;
}
.text {
  font-size: 30px;
}

.form-check {
  float: left;
  margin-left: 130px;
  margin-bottom: 80px;
  transform: scale(2);
}
.col-sm-2 col-form-label {
  font-size: 30px;
}
.col-16 col-md-12 col-lg-12 {
  background-color: lightgrey;
  display: none;
}

.title {
  text-align: center;
  font-size: 40px;
  margin-bottom: 30px;
}

#select-companies {
  width: 450px;
  float: left;
  font-size: 30px;
}

#select-flight {
  width: 450px;
  float: left;
  font-size: 30px;
}

table {
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 70px;
}

.table-nonfluid {
  width: auto !important;
}

.form_create_ticket {
  text-align: center;
}

input[type="text"] {
  width: 450px;
  font-size: 30px;
}

input[type="datetime-local"] {
  width: 450px;
  font-size: 30px;
}

#create_ticket_div {
  border-radius: 30px;
  padding: 20px;
  background: rgba(116, 189, 231, 0.514);
  margin-top: 15vh;
}
</style>