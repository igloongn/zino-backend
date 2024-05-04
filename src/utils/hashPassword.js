const bcrypt = require("bcrypt");

// Function to hash a password
const hashPassword = async (password) => {
	try {
		// Generate a salt
		const salt = await bcrypt.genSalt(10);
		// Hash the password with the salt
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	} catch (error) {
		throw error;
	}
};
module.exports = hashPassword;
