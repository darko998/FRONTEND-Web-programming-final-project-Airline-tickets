import axios from 'axios'

const baseUrl = "http://localhost:9999/AirlineApp/reservations";

let ReservationClient = {

	book (ticketId, flightId, comp) {
		axios.post(baseUrl + "/book", null, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
			params: {
				userId: localStorage.getItem('userId'),
				ticketId: ticketId,
				flightId: flightId
			}
		}).then((response) => {
			console.log('Reservation confirmed: ' + JSON.parse(JSON.stringify(response.data)));
			comp.refreshReservationCount(); /** Callback function. Notify that it finished its job. */
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	},

	unbook (ticketId, comp) {
		axios.post(baseUrl + "/delete", null, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
			params: {
				userId: localStorage.getItem('userId'),
				ticketId: ticketId,
			}
		}).then((response) => {
			console.log('Reservation deleted: ' + JSON.parse(JSON.stringify(response.data)));
			comp.refreshReservationCount(); /** Callback function. Notify that it finished its job. */
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	},

	getReservationCount (comp) {
		axios.get(baseUrl + "/count", {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
			params: {
				userId: localStorage.getItem('userId')
			}
		}).then((response) => {
			comp.userData.reservationCount = JSON.parse(JSON.stringify(response.data));
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
		});
	}
}

export default ReservationClient

