const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
	const token = req.header("Authorization");
	if (!token) {
		return res.status(401).json({ message: "Authorization token missing" });
	}

	try {
		const decoded = jwt.verify(token, "ZINO-ISOKO");
		req.user = decoded.user; // Set user data from token payload to request object
		next(); // Call the next middleware
	} catch (error) {
		return res.status(401).json({ message: "Invalid token" });
	}
};

module.exports = authenticateJWT;
