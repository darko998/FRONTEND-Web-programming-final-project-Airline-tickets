import axios from 'axios'

const baseUrl = "http://localhost:9999/AirlineApp/companies";


let CompaniesClient = {
	loadCompanies (comp) {
		axios.get(baseUrl, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
		}).then((response) => {
			comp.companies = JSON.parse(JSON.stringify(response.data));
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	}
}


export default CompaniesClient