const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		middlename: {
			type: String,
			required: true,
		},
		department: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/, // Regular expression for basic email validation
		},
		role: {
			type: String,
			enum: ["staff", "student"],
			default: "user", // Default role is 'user'
		},
		about: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
			unique: true, // Ensures userId is unique
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
