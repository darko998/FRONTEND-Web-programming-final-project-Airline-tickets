import axios from 'axios'

const baseUrl = "http://localhost:9999/AirlineApp/flights";


let FlightsClient = {
	loadFlights (comp) {
		axios.get(baseUrl, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
		}).then((response) => {
			comp.flights = JSON.parse(JSON.stringify(response.data));

		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	}
}


export default FlightsClient