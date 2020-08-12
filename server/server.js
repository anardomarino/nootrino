/*
 ******************************************************************************
 *	server.js -- server core file
 * 	Anthony Nardomarino
 * 	11-Aug-2020
 ******************************************************************************
 */

const http = require("http");
const bodyParser = require("body-parser"); // parse POST body requests
const express = require("express"); // node framework
const session = require("express-session"); // stores info about connected users
const mongoose = require("mongoose"); 
const path = require("path");

const api = require("./api");
const auth = require("./auth");

const socket = require("./server-socket");

// mongodb config
const mongoConnectionURL =
	"mongodb+srv://admin:J7TjK0Zjh7Q4MTz2@cluster0.wy6zv.mongodb.net/nootrino?retryWrites=true&w=majority";
const databaseName = "nootrino";


mongoose
	.connect(mongoConnectionURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: databaseName,
	})
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log(`Error connection to MongoDB: ${err}`));

// create express server
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
	session({
		secret: "session-secret",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(auth.populateCurrentUser);

app.use("/api", api);

const reactPath = path.resolve(__dirname, "..", "client", "dist");
app.use(express.static(reactPath));

app.get("*", (req,res) => {
	res.sendFile(path.join(reactPath, "index.html"));
});

// server error
app.use((err, req, res, next) => {
	const status = err.status || 500;
	if (status == 500) {
		console.log("Server errored when processing a request.");
		console.log(err);
	}

	res.status(status);
	res.send({
		status: status,
		message: err.message,
	});
});

const port = 3000;
const server = http.Server(app);
socket.init(server);

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
