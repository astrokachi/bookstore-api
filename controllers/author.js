const authorModel = require("../models/authors");

const getAllAuthors = (req, res) => {
	authorModel
		.find()
		.then((Authors) => {
			res.send(Authors);
		})
		.catch((err) => {
			console.log(err);
			res.send(err);
		});
};
const getAuthor = (req, res) => {
	const id = req.params.id;
	authorModel
		.findById(id)
		.then((Author) => {
			res.status(200).send(Author);
		})
		.catch((err) => {
			console.log(err);
			res.status(404).send(err);
		});
};
const postAuthor = (req, res) => {
	const Author = req.body;
	Author.updatedAt = new Date(); // set the lastUpdateAt to the current date
	authorModel
		.create(Author)
		.then((Author) => {
			res.status(201).send(Author);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};
const updateAuthor = (req, res) => {
	const id = req.params.id;
	const Author = req.body;
	Author.updatedAt = new Date(); // set the lastUpdateAt to the current date
	authorModel
		.findByIdAndUpdate(id, Author, { new: true })
		.then((newAuthor) => {
			res.status(200).send(newAuthor);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};
const deleteAuthor = (req, res) => {
	const id = req.params.id;
	authorModel
		.findByIdAndRemove(id)
		.then((Author) => {
			res.status(200).send(Author);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
};

module.exports = {
	getAuthor,
	getAllAuthors,
	postAuthor,
	updateAuthor,
	deleteAuthor,
};
