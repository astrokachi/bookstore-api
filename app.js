const express = require("express");
const bodyParser = require("body-parser");
const CONFIG = require("./config");
const dbConnect = require("./db");
const bookRouter = require("./routes/book");

const app = express();
app.use(bodyParser.json());

app.use("/api/v1/books", bookRouter);

//error handler middleware
app.use((error, req, res, next) => {
	console.log(error);

	const errorStatus = error.status || 500;

	res.status(errorStatus).send(error.message);

	next();
});

dbConnect();
app.listen(CONFIG.PORT, () => {
	console.log("server started on localhost", CONFIG.PORT);
});
