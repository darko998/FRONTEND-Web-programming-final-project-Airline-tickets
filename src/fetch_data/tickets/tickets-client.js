import axios from 'axios'


const baseUrl = "http://localhost:9999/AirlineApp/tickets";

let TicketClient = {

	loadTickets (comp) {
		axios.get(baseUrl, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
			params: {
				ticketType: "2" /** 2 means all ticket types. */
			}
		}).then((response) => {
			let tickets = JSON.parse(JSON.stringify(response.data));


			comp.tickets = tickets;
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	},

	loadFilteredTickets (ticketType, originCity, destinationCity, departDate, returnDate, comp) {
		axios.get(baseUrl, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
			params: {
				ticketType: ticketType,
				originCity: originCity,
				destinationCity: destinationCity,
				departDate: departDate,
				returnDate: returnDate
			}
		}).then((response) => {
			comp.tickets = JSON.parse(JSON.stringify(response.data));
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	},

	loadCompanyTickets (companyId, comp) {
		axios.get(baseUrl + "/company", {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
			params: {
				companyId: companyId,
				ticketType: "2" /** 2 means all ticket types */
			}
		}).then((response) => {
			let tickets = JSON.parse(JSON.stringify(response.data));


			comp.tickets = tickets;
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	},

	loadCompanyFilteredTickets (ticketType, originCity, destinationCity, departDate, returnDate, comp, companyId) {
		axios.get(baseUrl + "/company", {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
			params: {
				ticketType: ticketType,
				originCity: originCity,
				destinationCity: destinationCity,
				departDate: departDate,
				returnDate: returnDate,
				companyId: companyId
			}
		}).then((response) => {
			comp.tickets = JSON.parse(JSON.stringify(response.data));
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	},

	createTicket (oneWay, from, to, departDate, returnDate, count, companyId, flightId, comp) {
		axios.post(baseUrl + "/create", false, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
			params: {
				oneWay: oneWay,
				from: from,
				to: to,
				departDate: departDate,
				returnDate: returnDate,
				count: count,
				companyId: companyId,
				flightId: flightId
			}
		}).then((response) => {
			console.log(JSON.parse(JSON.stringify(response.data)));
			comp.refreshFlights();
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	},


	deleteTicket (id, comp) {
		axios.delete(baseUrl + "/" + id + "/delete", {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			}
		}).then((response) => {
			console.log(JSON.parse(JSON.stringify(response.data)));

			/** We want to delete ticket on frontend, so we don't need to load all tickets again. */
			comp.deleteTicket(id);

		}, (error) => {
			console.log("An error occured:");
			console.log(error);
			alert("Fail while trying to delete this ticket.")
		});
	},


	loadTicketById (id, comp) {
		axios.get(baseUrl + "/" + id, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			}
		}).then((response) => {
			let ticket = JSON.parse(JSON.stringify(response.data));


			comp.oneWay = ticket.oneWay;
			comp.isReturnDateHidden = ticket.oneWay == true
			comp.flightId = ticket.flightId;

			/** Here we get substring of full date returned from database. Full date length is 24, but datetime-local only
			 * accept first 16 characters.
			 */
			comp.departDate = new Date(ticket.departDate).toISOString().substring(0, 16);

			if (ticket.returnDate != null)
				comp.returnDate = new Date(ticket.returnDate).toISOString().substring(0, 16);

			comp.count = ticket.count;
			comp.companyId = ticket.companyId;

		}, (error) => {
			console.log("An error occured:");
			console.log(error);
			alert("Fail while trying to delete this ticket.")
		});
	},


	updateTicket (ticketId, oneWay, from, to, departDate, returnDate, count, companyId, flightId, comp) {
		axios.post(baseUrl + "/" + ticketId + "/update", false, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
			params: {
				oneWay: oneWay,
				from: from,
				to: to,
				departDate: departDate,
				returnDate: returnDate,
				count: count,
				companyId: companyId,
				flightId: flightId
			}
		}).then((response) => {
			console.log(JSON.parse(JSON.stringify(response.data)));
			comp.backToHome();
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	}

}


export default TicketClient