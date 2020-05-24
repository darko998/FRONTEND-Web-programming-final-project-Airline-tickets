import axios from 'axios'

const baseUrl = "http://localhost:9999/AirlineApp/companies";


let CompaniesClient = {
	loadCompanies (comp) {
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
	},

	updateCompany (name, version, comp) {
		console.log(name + " --- " + version);
		axios.post(baseUrl + "/" + comp.$parent.company.companyId + "/update", false, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
			params: {
				name: name,
				version: version
			}
		}).then((response) => {
			let company = JSON.parse(JSON.stringify(response.data));

			console.log(JSON.parse(JSON.stringify(response.data)));


			comp.$parent.companyName = company.name;
			comp.$parent.setNewVersion(company.id, company.version);
			comp.$parent.showForm = false;

			console.log(comp.$parent.companies);
			return company.name;
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
			alert("You entered company that already exists!");
		});
	},

	deleteCompany (id) {
		axios.delete(baseUrl + "/" + id + "/delete", {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			}
		}).then((response) => {
			console.log(JSON.parse(JSON.stringify(response.data)));

		}, (error) => {
			console.log("An error occured:");
			console.log(error);
			alert("This operation failed!");
		});
	}
}


export default CompaniesClient