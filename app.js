const express = require("express");
const bodyParser = require("body-parser");
const CONFIG = require("./config");
const dbConnect = require("./db");
const bookRouter = require("./routes/book");
const authorRouter = require("./routes/author");
const rateLimiter = require("express-rate-limit");

const limiter = rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();
app.use(bodyParser.json());
app.use(limiter);

app.use("/api/v1/books", bookRouter);
app.use("/api/v1/authors", authorRouter);

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
