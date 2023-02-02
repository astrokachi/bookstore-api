const express = require("express");
const {
	getBook,
	getAllBooks,
	postBook,
	updateBook,
	deleteBook,
} = require("../controllers/book");

const BookValidationMiddleWare = require("../validators/book_validator");

const bookRouter = express.Router();

bookRouter.route("/").get(getAllBooks).post(BookValidationMiddleWare, postBook);
bookRouter.route("/:id").get(getBook).put(updateBook).delete(deleteBook);

module.exports = bookRouter;
