const express = require("express");
const {
	getAuthor,
	getAllAuthors,
	postAuthor,
	updateAuthor,
	deleteAuthor,
} = require("../controllers/author");

const AuthorValidationMiddleWare = require("../validators/author_validator");

const authorRouter = express.Router();

authorRouter
	.route("/")
	.get(getAllAuthors)
	.post(AuthorValidationMiddleWare, postAuthor);
authorRouter
	.route("/:id")
	.get(getAuthor)
	.put(updateAuthor)
	.delete(deleteAuthor);

module.exports = authorRouter;
