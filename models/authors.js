const mongoose = require("mongoose");
const { Schema } = mongoose;

const AuthorSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		dob: {
			type: Date,
		},
		country: {
			type: String,
			required: false,
		},
		books: {
			type: Array,
			default: [],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		updatedAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Authors", AuthorSchema);
