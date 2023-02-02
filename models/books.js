const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogPost = new Schema(
	{
		title: {
			type: String,
			required: [true, "Please provide a title for your blog"],
			unique: [true, "This title already exists!"],
		},
		shortDescription: {
			type: String,
			required: false,
		},
		longDescription: {
			type: String,
			required: false,
		},
		price: {
			type: Number,
			required: true,
		},
		author: {
			type: String,
			ref: "User",
		},
		year: {
			type: Number,
			required: true,
			max: [2023, "Year cannot be greater than current year"],
		},

		isbn: {
			type: String,
			required: true,
			unique: [true, "The isbn must be unique"],
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

module.exports = mongoose.model("Blog", BlogPost);
