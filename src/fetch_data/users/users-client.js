import axios from 'axios'

const baseUrl = "http://localhost:9999/AirlineApp/users";

let ClientUser = {

	getUsers (comp) {
		axios.get(baseUrl, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
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
	}

}

export default ClientUser
