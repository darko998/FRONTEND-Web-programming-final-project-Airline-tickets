import axios from 'axios'

const baseUrl = "http://localhost:9999/AirlineApp/cities";


let CitiesClient = {
	loadCities (comp) {
		axios.get(baseUrl, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
		}).then((response) => {
			comp.cities = JSON.parse(JSON.stringify(response.data));
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	}
}


export default CitiesClient