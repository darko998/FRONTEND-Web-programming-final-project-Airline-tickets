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
			comp.tickets = JSON.parse(JSON.stringify(response.data));

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
	}

}


export default TicketClient