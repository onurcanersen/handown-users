const axios = require("axios");

function user_login_test() {
	axios
		.post("https://us-central1-handown.cloudfunctions.net/users/login", {
			"email" : "volkan@test.com",
			"password" : "1235"
		})
		.then((res) => {
			if(res.status=="200"){
				console.log("Test is successfull")
				console.log(res.data)
			}
		});
}

function user_wrong_login_test() {
	axios
		.post("https://us-central1-handown.cloudfunctions.net/users/login", {
			"email" : "voln@test.com",
			"password" : "15"
		})
		.then((res) => {
			if(res.status=="200"){
				console.log("Test is not successfull")
				console.log()
			}
			else{
				console.log("Test is successfull")
				console.log()
			}
		})
		.catch(error => {
			console.log("User cannot login \nTest is successfull")
		});
}

function singup_test_with_one_character_password() {
	axios
		.post("https://us-central1-handown.cloudfunctions.net/users/signup", {
			"email" : "voln@test.com",
			"name" : "volkan",
			"surname" : "sahin",
			"password" : "s",
			"type" : "SELLER"
		})
		.then((res) => {
			if(res.status=="200"){
				console.log("Test is not successfull")
				console.log()
			}
			else{
				console.log("Test is successfull")
				console.log()
			}
		})
		.catch(error => {
			console.log("User cannot signup \nTest is successfull")
		});
}

function singup_test_with_valid_password() {
	axios
		.post("https://us-central1-handown.cloudfunctions.net/users/signup", {
			"email" : "voln@test.com",
			"name" : "volkan",
			"surname" : "sahin",
			"password" : "volkan",
			"type" : "SELLER"
		})
		.then((res) => {
			if(res.status=="200"){
				console.log("Test is successfull")
				console.log()
			}
			else{
				console.log("Test is not successfull")
				console.log()
			}
		})
		.catch(error => {
			console.log("User cannot signup \nTest is unsuccessfull")
			console.log(error.data)
		});
}

function get_users_test() {
	axios
		.get("https://us-central1-handown.cloudfunctions.net/users")
		.then((res) => {
			if(res.status=="200"){
				console.log("Test is successfull")
			}
		});
}


user_login_test()
user_wrong_login_test()
singup_test_with_one_character_password()
singup_test_with_valid_password()
get_users_test()
