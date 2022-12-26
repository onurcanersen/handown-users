const axios = require("axios");

function get_users_test() {
	axios
		.get("https://us-central1-handown.cloudfunctions.net/users")
		.then((res) => {
			console.log(res);
		});
}

get_users_test();
