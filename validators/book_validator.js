const Joi = require("joi");

const BookSchema = Joi.object({
	title: Joi.string().required().min(5).max(255).trim(),
	shortDescription: Joi.string().min(5).max(255).trim(),
	longDescription: Joi.string().min(5).trim(),
	year: Joi.number().integer().required().max(2022),
	price: Joi.number().min(0).required(),
	createdAt: Joi.date().default(Date.now()),
	isbn: Joi.string().required(),
	updatedAt: Joi.date().default(Date.now()),
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
