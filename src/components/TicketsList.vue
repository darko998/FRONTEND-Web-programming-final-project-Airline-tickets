<template>
  <div class="div-background">
    <!-- DIV FOR FILTERING TICKETS-->
    <div class="container-filter">
      <h4>Filter tickets</h4>
      <br />
      <br />
      <form>
        <!-- FROM INPUT FIELD-->
        <div class="form-group">
          <label for="from">
            <strong>From</strong>
          </label>
          <input type="text" class="form-control" id="from" placeholder="From" />
        </div>

        <!-- DESTINATION INPUT FIELD-->
        <div class="form-group">
          <label for="to">
            <strong>To</strong>
          </label>
          <input type="text" class="form-control" id="to" placeholder="To" />
        </div>

        <br />
        <hr class="my-4" />
        <br />
        <!-- DEPART DATE FIELD-->
        <div class="form-group">
          <label for="depart-date">
            <strong>Depart date</strong>
          </label>
          <input type="text" class="form-control" id="depart-date" placeholder="Return date" />
        </div>

        <!-- RETURN DATE FIELD-->
        <div class="form-group">
          <label for="return-date">
            <strong>Return date</strong>
          </label>
          <input type="text" class="form-control" id="return-date" placeholder="Return date" />
        </div>

        <br />
        <br />
        <br />
        <!-- FILTER SUBMIT BUTTON-->
        <button type="submit" class="btn btn-success">Apply filter</button>
      </form>
    </div>
    <!-- END OF DIV FOR FILTERING TICKETS-->

    <ul>
      <li v-bind:key="ticket.id" v-for="ticket in tickets">
        <div class="frame-ticket">
          <!-- DIV FOR TICKETS-->
          <div class="container-jobs">
            <div class="ticket-container">
              <div class="ticket-title">
                <h1 class="h1-from">{{ getOriginCityNameWithFlightId(ticket.flightId) }}</h1>
                <h1 class="h1-from">-</h1>
                <h1 class="h1-to">{{ getDestinationCityNameWithFlightId(ticket.flightId) }}</h1>

                <div class="icons">
                  <!-- ICON FOR TICKET EDIT-->
                  <div class="icon-edit">
                    <span class="tooltiptext">Edit ticket</span>
                    <svg
                      class="bi bi-pencil-square"
                      width="2em"
                      height="2em"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      v-on:click="editTicket"
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
                    <span class="tooltiptext">Delete ticket</span>

                    <svg
                      class="bi bi-archive"
                      width="2em"
                      height="2em"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      v-on:click="deleteTicket"
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

              <!-- DIV FOR TICKET DESCRIPTION-->
              <div class="ticket-desc">
                <div class="desc-without-company">
                  <!-- DIV FOR DEPART DATE  -->
                  <div class="depart-date">
                    <p>Depart date</p>
                    <h3>{{ new Date(ticket.departDate).toLocaleString() }}</h3>
                  </div>

                  <!-- DIV FOR RETURN DATE  -->
                  <div class="return-date">
                    <p>Depart date</p>
                    <h3>{{ new Date(ticket.returnDate).toLocaleString() }}</h3>
                  </div>

                  <!-- DIV FOR TICKET TYPE  -->
                  <div class="one-way">
                    <p>Ticket type</p>
                    <h3 v-if="ticket.oneWay == 1">One way</h3>
                    <h3 v-if="ticket.oneWay == 0">Return</h3>
                  </div>

                  <!-- DIV FOR AVAILABLE TICKET NUMBER  -->
                  <div class="ticket-number">
                    <p>Available tickets</p>
                    <h3>{{ ticket.count }}</h3>
                  </div>
                </div>

                <!-- DIV FOR COMPANY  -->
                <div class="ticket-company">
                  <p>Company</p>
                  <h3>{{ getCompanyNameWithCompanyId(ticket.companyId) }}</h3>
                </div>
              </div>
            </div>
          </div>
          <!-- DIV FOR BUTTON BOOK  -->
          <div class="div-book">
            <button class="apply-button">Book</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>
import TicketClient from '../fetch_data/tickets/tickets-client.js'
import FlightsClient from '../fetch_data/flights/flights-client.js'
import CitiesClient from '../fetch_data/cities/cities-client.js'
import CompaniesClient from '../fetch_data/companies/companies-client.js'

export default {
  name: "TicketsList",
  methods: {
    loadTickets () {
      TicketClient.loadTickets(this.$parent);
    },
    loadFlights () {
      FlightsClient.loadFlights(this);
    },
    loadCities () {
      CitiesClient.loadCities(this);
    },
    loadCompanies () {
      CompaniesClient.loadCompanies(this);
    },

    deleteTicket () {
      console.log("delete");
    },
    editTicket () {
      console.log("edit");
    },

    getOriginCityNameWithFlightId (id) {
      let originCityId

      for (let i in this.flights) {

        if (this.flights[i].id === id) {
          originCityId = this.flights[i].originCityId;

        }
      }

      let originCityName
      for (let i in this.cities) {
        if (this.cities[i].id == originCityId) {
          originCityName = this.cities[i].name;

        }
      }

      return originCityName;
    },

    getDestinationCityNameWithFlightId (id) {
      let destinationCityId

      for (let i in this.flights) {

        if (this.flights[i].id === id) {
          destinationCityId = this.flights[i].destinationCityId;

        }
      }

      let destinationCityName
      for (let i in this.cities) {
        if (this.cities[i].id == destinationCityId) {
          destinationCityName = this.cities[i].name;

        }
      }

      return destinationCityName;
    },

    getCompanyNameWithCompanyId (id) {
      let companyName

      for (let i in this.companies) {
        if (this.companies[i].id == id)
          companyName = this.companies[i].name;
      }

      return companyName;
    }
  },

  created () {

    this.loadTickets();
    this.loadFlights();
    this.loadCities();
    this.loadCompanies();
  },

  props: ['tickets'],

  data () {
    return {
      flights: [],
      cities: [],
      companies: []
    }
  }
}
</script>



<style scoped>
ul {
  list-style: none;
}

.apply-button {
  margin-top: 50px;
  margin-right: 20px;
  display: inline-block;
  padding: 15px 75px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #4caf50;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}

.apply-button:hover {
  background-color: #3e8e41;
}

.apply-button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.icon-delete:hover {
  transform: translateY(4px);
}

.icon-edit:hover {
  transform: translateY(4px);
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

.icon-edit {
  display: inline-block;
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

.icon-delete {
  display: inline-block;
}

.icon-delete .tooltiptext::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent transparent black;
}

.frame-ticket {
  margin-top: 30px;
  margin-right: 200px;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(75, 75, 75);
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  overflow: hidden; /* if you don't want #second to wrap below #first */
}

.h1-from {
  display: inline-block;
  margin-right: 120px;
}

p {
  font-size: 20px;
}

.h1-to {
  display: inline-block;
}

.desc-without-company {
  float: left;
}

.depart-date {
  margin-right: 50px;
  display: inline-block;
}

.icons {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}

.icon-edit {
  display: inline-block;
  margin-right: 10px;
}

.icon-delete {
  display: inline-block;
}
.one-way {
  display: inline-block;
  margin-right: 120px;
}

.ticket-number {
  display: inline-block;
}

.div-book {
  display: inline-block;
}

.ticket-company {
  float: right;
  margin-right: 30px;
}

.return-date {
  display: inline-block;
  margin-right: 100px;
}
.ticket-title {
  margin-top: 20px;
  margin-bottom: 10px;
}

.ticket-container {
  width: 97%;
  background: rgba(116, 189, 231, 0.541);
  margin: 10px;
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.hr-title {
  width: 98%;
  border: 0.2px solid rgb(75, 75, 75);
}

.btn {
  width: 100%;
}

.div-background {
  width: 100% !important;
  height: 100% !important;
}

.container-filter {
  float: left; /* add this */
  margin-left: 30px;
  margin-right: 130px;
  min-height: 100vh;
}

.container-jobs {
  width: 80%;
  overflow: hidden; /* if you don't want #second to wrap below #first */
  float: left;
}
</style>