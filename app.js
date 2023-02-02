const express = require("express");
const bodyParser = require("body-parser");
const CONFIG = require("./config");
const dbConnect = require("./db");
const bookRouter = require("./routes/book");
const authorRouter = require("./routes/author");
const logger = require("./logger/logger");
const { requiresAuth } = require("express-openid-connect");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const authMiddleware = require("./auth/auth0");

const app = express();

const limiter = rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

dbConnect();

app.use(bodyParser.json());
app.use(authMiddleware);
app.use(limiter);
app.use(helmet());

app.use("/api/v1/books", requiresAuth(), bookRouter);
app.use("/api/v1/authors", requiresAuth(), authorRouter);

//error handler middleware
app.use((error, req, res, next) => {
	logger.error(error);

	const errorStatus = error.status || 500;

	res.status(errorStatus).send(error.message);

	next();
});

app.get("/", (req, res) => {
	res.send("Welcome home");
});

app.listen(CONFIG.PORT, () => {
	logger.info(`server started on localhost, ${CONFIG.PORT}`);
});
