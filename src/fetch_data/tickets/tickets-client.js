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
		}).then((response) => {
			let tickets = JSON.parse(JSON.stringify(response.data));


			comp.tickets = tickets;
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	},

	loadFilteredTickets (originCity, destinationCity, departDate, returnDate, comp) {
		axios.get(baseUrl, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
			params: {
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
				companyId: companyId
			}
		}).then((response) => {
			let tickets = JSON.parse(JSON.stringify(response.data));


			comp.tickets = tickets;
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	},

	loadCompanyFilteredTickets (originCity, destinationCity, departDate, returnDate, comp, companyId) {
		axios.get(baseUrl + "/company", {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
			params: {
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
	}

}


export default TicketClient