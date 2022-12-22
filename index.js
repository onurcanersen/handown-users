const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");

var app = express();
app.use(bodyparser.json());

var con = mysql.createConnection({
	host: "34.123.29.215",
	user: "root",
	password: "Pf1pVU2/|54x&j^+",
	database: "handown",
});

con.connect((err) => {
	if (!err) console.log("Database connection established successfully");
	else console.log("Database connection failed");
});

app.get("/", (req, res) => {
	const sql = "SELECT * FROM users";
	con.query(sql, (err, rows, fields) => {
		if (!err) res.status(200).send(rows);
		else res.status(500).send(err);
	});
});

app.post("/signup", (req, res) => {
	const user = req.body;
	const user_email = user.user_email;
	const user_name = user.user_name;
	const user_surname = user.user_surname;
	const user_password = user.user_password;
	const user_type = user.user_type;
	const sql =
		"INSERT INTO users(user_email, user_name, user_surname, user_password, user_type) values(?, ?, ?, ?, ?)";
	con.query(
		sql,
		[user_email, user_name, user_surname, user_password, user_type],
		(err, rows, fields) => {
			if (!err) res.status(200).send("User created successfully");
			else res.status(500).send(err);
		}
	);
});

app.post("/login", (req, res) => {
	const user = req.body;
	const user_email = user.user_email;
	const user_password = user.user_password;
	const sql = "SELECT * FROM users WHERE user_email = ? and user_password = ?";
	con.query(sql, [user_email, user_password], (err, rows, fields) => {
		if (!err) {
			if (rows && rows.length > 0) res.status(200).send(rows);
			else res.status(200).send("Invalid email or password");
		} else {
			res.status(500).send(err);
		}
	});
});

exports.users = app;
