const Joi = require("joi");

const AuthorSchema = Joi.object({
	firstName: Joi.string().required().min(1).max(255).trim(),
	lastName: Joi.string().required().min(1).max(255).trim(),
	dob: Joi.date().greater('1-1-1900').less('1-1-2023').required(),
	country: Joi.string().optional().trim(),
	books: Joi.array().items(Joi.string()).optional().optional(),
	createdAt: Joi.date().default(Date.now()),
});

async function AuthorValidationMiddleWare(req, res, next) {
	const authorPayload = req.body;

	try {
		await AuthorSchema.validateAsync(authorPayload);
		next();
	} catch (error) {
		next({
			message: error.details[0].message,
			status: 400,
		});
	}
}

module.exports = AuthorValidationMiddleWare;
