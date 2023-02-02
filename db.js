const mongoose = require("mongoose");
const CONFIG = require("./config");

function dbConnect() {
	mongoose.connect(CONFIG.MONGODB_URI);

	mongoose.connection.on("connected", () => {
		console.log("mongo db connected successfully");
	});

	mongoose.connection.on("error", (err) => {
		console.log("An error occured while connecting to the mongo db server");
		console.log(err);
	});
}

module.exports = dbConnect