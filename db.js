const mongoose = require("mongoose");
const CONFIG = require("./config");
const logger = require("./logger/logger");

function dbConnect() {
	mongoose.connect(CONFIG.MONGODB_URI);

	mongoose.connection.on("connected", () => {
		logger.info("mongo db connected successfully");
	});

	mongoose.connection.on("error", (err) => {
		logger.error(err);
	});
}

module.exports = dbConnect;
