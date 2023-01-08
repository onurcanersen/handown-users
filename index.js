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

app.delete("/:id", (req, res) => {
	const sql = "DELETE FROM users WHERE id = ?";
	con.query(sql, [req.params.id], (err, rows, fields) => {
		if (!err) res.status(200).send("User deleted successfully");
		else res.status(500).send(err);
	});
});

app.post("/signup", (req, res) => {
	const user = req.body;
	const email = user.email;
	const name = user.name;
	const surname = user.surname;
	const password = user.password;
	const type = user.type;
	const sql =
		"INSERT INTO users(email, name, surname, password, type) values(?, ?, ?, ?, ?)";
	con.query(
		sql,
		[email, name, surname, password, type],
		(err, rows, fields) => {
			if (!err) res.status(200).send("User created successfully");
			else res.status(500).send(err);
		}
	);
});

app.post("/login", (req, res) => {
	const user = req.body;
	const email = user.email;
	const password = user.password;
	const sql = "SELECT * FROM users WHERE email = ? and password = ? LIMIT 1";
	con.query(sql, [email, password], (err, rows, fields) => {
		if (!err) {
			if (rows && rows.length > 0) res.status(200).send(rows);
			else res.status(401).send("Invalid email or password");
		} else {
			res.status(500).send(err);
		}
	});
});

app.post("/getID", (req, res) => {
	const user = req.body;
	const email = user.email;
	const name = user.name;
	const surname = user.surname;
	const sql = "SELECT id FROM users WHERE email = ? and name = ? and surname = ? LIMIT 1";
	con.query(sql, [email, name, surname], (err, rows, fields) => {
		if (!err) {
			if (rows && rows.length > 0) res.status(200).send(rows);
			else res.status(401).send("No user");
		} else {
			res.status(500).send(err);
		}
	});
});

exports.users = app;
