import axios from 'axios'

const baseUrl = "http://localhost:9999/AirlineApp/companies";


let CompaniesClient = {
	loadCompanies (comp) {
		console.log("fsadfsdafdsafdsafsafas");
		axios.get(baseUrl, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			}
		}).then((response) => {
			comp.companies = JSON.parse(JSON.stringify(response.data));
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	},

	getCompanyNameById (companyId, comp) {
		axios.get(baseUrl + "/" + companyId, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			}
		}).then((response) => {
			let company = JSON.parse(JSON.stringify(response.data));
			comp.companyName = company.name;
			return company.name;
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	}
}


export default CompaniesClient