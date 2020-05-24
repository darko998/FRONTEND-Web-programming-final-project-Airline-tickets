import axios from 'axios'

const baseUrl = "http://localhost:9999/AirlineApp/reservations";

let ReservationClient = {

	book (ticket, flightId, comp) {
		axios.post(baseUrl + "/book", null, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
			params: {
				userId: localStorage.getItem('userId'),
				ticketId: ticket.id,
				flightId: flightId,
				count: ticket.count,
				version: ticket.version
			}
		}).then((response) => {
			console.log('Reservation confirmed: ' + JSON.parse(JSON.stringify(response.data)));
			comp.refreshReservationCount(); /** Callback function. Notify that it finished its job. */


			/** Because we successfully book ticket, we did some changes at backend. But I don't wan't
			 * to load all that tickets again, I just changed that properties here, which will be
			 * immediately visible on page. The next three lines of code are used for this.
			 */
			ticket.reserved = true;
			ticket.count = ticket.count - 1;
			ticket.version = ticket.version + 1;
		}, (error) => {
			console.log("An error occured:");
			console.log(error);
			alert("That ticket is no longer available to book.");
		});
	},

	unbook (ticket, comp) {
		axios.post(baseUrl + "/delete", null, {
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": "Bearer " + localStorage.jwt
			},
			params: {
				userId: localStorage.getItem('userId'),
				ticketId: ticket.id,
				count: ticket.count,
				version: ticket.version
			}
		}).then((response) => {
			console.log('Reservation deleted: ' + JSON.parse(JSON.stringify(response.data)));
			comp.refreshReservationCount(); /** Callback function. Notify that it finished its job. */


			/** Because we successfully book ticket, we did some changes at backend. But I don't wan't
 			* to load all that tickets again, I just changed that properties here, which will be
 			* immediately visible on page. The next three lines of code are used for this.
 			*/
			ticket.reserved = false;
			ticket.count = ticket.count + 1;
			ticket.version = ticket.version + 1;
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

