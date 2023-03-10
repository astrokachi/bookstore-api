const bookModel = require("../models/books");
const bookValidation = require("../validators/book_validator");

const getAllBooks = (req, res) => {
	bookModel
		.find()
		.then((books) => {
			res.send(books);
		})
		.catch((err) => {
			console.log(err);
			res.send(err);
		});
};
const getBook = (req, res) => {
	const id = req.params.id;
	bookModel
		.findById(id)
		.then((book) => {
			res.status(200).send(book);
		})
		.catch((err) => {
			console.log(err);
			res.status(404).send(err);
		});
};
const postBook = (req, res) => {
	const book = req.body;
	book.updatedAt = new Date(); // set the lastUpdateAt to the current date
	bookModel
		.create(book)
		.then((book) => {
			res.status(201).send(book);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};
const updateBook = (req, res) => {
	const id = req.params.id;
	const book = req.body;
	book.updatedAt = new Date(); // set the lastUpdateAt to the current date
	bookModel
		.findByIdAndUpdate(id, book, { new: true })
		.then((newBook) => {
			res.status(200).send(newBook);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};
const deleteBook = (req, res) => {
	const id = req.params.id;
	bookModel
		.findByIdAndRemove(id)
		.then((book) => {
			res.status(200).send(book);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};

module.exports = { getBook, getAllBooks, postBook, updateBook, deleteBook };
