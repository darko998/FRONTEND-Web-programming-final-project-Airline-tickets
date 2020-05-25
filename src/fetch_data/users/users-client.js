import axios from 'axios'

const baseUrl = "http://localhost:9999/AirlineApp/users";

let ClientUser = {

	getUsers (comp) {
		axios.get(baseUrl, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			}
		}).then((response) => {
			comp.users = JSON.parse(JSON.stringify(response.data))
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	},

	login (username, password, comp) {
		axios.get(baseUrl + "/login", {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
			params: {
				username: username,
				password: password
			}
		}).then((response) => {
			console.log(JSON.parse(JSON.stringify(response.data)))

			localStorage.setItem('userId', JSON.parse(JSON.stringify(response.data.id)));
			localStorage.setItem('jwt', JSON.parse(JSON.stringify(response.data.jwtToken)));
			localStorage.setItem('username', JSON.parse(JSON.stringify(response.data.username)));
			localStorage.setItem('userType', JSON.parse(JSON.stringify(response.data.userType)));

			console.log(localStorage.getItem('jwt'));

			/** Reset fields after user try to login */
			comp.username = "";
			comp.password = "";
			comp.errorMsg = "";

			comp.$router.push({ name: 'home' })
		}, (error) => {
			console.log(error);

			comp.errorMsg = "Credentials are not valid!";
		});
	},


	getUserTickets (comp) {
		axios.get(baseUrl + "/" + comp.id + "/tickets", {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			}
		}).then((response) => {
			console.log(JSON.parse(JSON.stringify(response.data)));
			comp.tickets = JSON.parse(JSON.stringify(response.data));
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	},


	getFilteredUserTickets (ticketType, originCity, destinationCity, departDate, returnDate, comp) {
		axios.get(baseUrl + "/" + comp.id + "/tickets", {
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
			console.log(JSON.parse(JSON.stringify(response.data)));
			comp.tickets = JSON.parse(JSON.stringify(response.data));
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	},


	createUser (username, password, userType) {
		axios.post(baseUrl + "/create", false, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
			params: {
				username: username,
				password: password,
				userType: userType
			}
		}).then((response) => {
			console.log(JSON.parse(JSON.stringify(response.data)));
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
			alert("User with username (" + username + ") already exists. Pick another one username!");
		});
	},


	loadUserTypes (comp) {
		axios.get(baseUrl + "/types", {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			}
		}).then((response) => {
			comp.userTypes = JSON.parse(JSON.stringify(response.data))
			console.log(JSON.parse(JSON.stringify(response.data)))
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	}

}

export default ClientUser
