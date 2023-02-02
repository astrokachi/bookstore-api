const joi = require("joi");

const BookSchema = joi.object({
	title: joi.string().required().min(5).max(255).trim(),
	shortDescription: joi.string().min(5).max(255).trim(),
	longDescription: joi.string().min(5).trim(),
	year: joi.number().integer().required().max(2022),
	price: joi.number().min(0).required(),
	createdAt: joi.date().default(Date.now()),
	isbn: joi.string().required(),
	updatedAt: joi.date().default(Date.now()),
});

async function BookValidationMiddleWare(req, res, next) {
	const bookPayload = req.body;

	try {
		await BookSchema.validateAsync(bookPayload);
		next();
	} catch (error) {
		next({
			message: error.details[0].message,
			status: 400,
		});
	}
}

module.exports = BookValidationMiddleWare;
