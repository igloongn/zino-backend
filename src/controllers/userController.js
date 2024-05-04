const User = require("../models/userModel");
const hashPassword = require("../utils/hashPassword");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Controller function for creating a new user
const createUser = async (req, res) => {
	try {
		// Extract user details from request body
		const {
			firstname,
			lastname,
			role,
			userId,
			password,
			middlename,
			email,
			department,
			about,
		} = req.body;
		const hashedPassword = await hashPassword(password);
		console.log(hashedPassword);

		// Check if the user already exists
		const existingUser = await User.findOne({ userId });
		if (existingUser) {
			return res.status(400).json({ message: "User already exists" });
		}

		// Create a new user instance
		const newUser = new User({
			firstname,
			middlename,
			lastname,
			role,
			department,
			email,
			userId,
			about,
			password: hashedPassword,
		});

		// Save the new user to the database
		const savedUser = await newUser.save();

		// Respond with the created user object
		res.status(201).json(savedUser);
	} catch (err) {
		// Handle errors
		res.status(500).json({ statuscode: 500, message: err.message });
	}
};

const getUsers = async (req, res) => {
	try {
		// Fetch all users from the database
		const users = await User.find();
		res.json(users);
	} catch (err) {
		// Handle errors
		res.status(500).json({ message: err.message });
	}
};

const singleUser = async (req, res) => {
	try {
		const { userId } = req.params;
		const user = await User.findOne({ _id: userId });

		if (!user) {
			return res.status(404).json({ error: "User not found", id: userId });
		}
		return res.status(200).json(user);
	} catch (err) {
		// Handle errors
		res.status(500).json({ statusCode: 500, error: err.message });
	}
};

const updateUser = async (req, res) => {
	const userId = req.params.id;
	const updatedUserData = req.body;
	console.log(req.body);

	try {
		const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
			new: true,
		});
		res.json(updatedUser);
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

// This is for Login
const loginUser = async (req, res) => {
	try {
		const { userId, password, role } = req.body;
		console.log(req.body);

		if ((userId, password, role)) {
			// Check if the user exists
			const user = await User.findOne({ userId, role });

			if (!user) {
				console.log("Invalid credentials");
				return res.status(401).json({ message: "Invalid credentials" });
			}

			// Verify password
			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				console.log("Invalid credentials");
				return res.status(401).json({ message: "Invalid credentials" });
			}

			// Generate JWT
			jwtPayload = {
				user: user._id,
				roleId: user.userId,
				firstname: user.firstname,
				lastname: user.lastname,
				role: user.role,
				department: user.department,
				middlename: user.middlename,
				email: user.email,
			};
			const now = new Date();
			const expirationDate = new Date(
				now.getFullYear() + 10,
				now.getMonth(),
				now.getDate()
			);
			const token = jwt.sign({ jwtPayload }, "ZINO-ISOKO", {
				expiresIn: expirationDate.getTime(),
			});

			console.log(`User ${user.userId} is logged in!`);
			// Send token in response
			return res
				.status(200)
				.json({ token, message: `User ${user.userId} is logged in!` });
			// .json({ message: `User ${user.userId} is logged in!` })
		} else {
			return res.status(400).json({ message: `credentials not complete` });
			// .json({ message: `User ${user.userId} is logged in!` })
		}
	} catch (error) {
		console.log("Internal Server Error");
		res.status(500).json({ message: "Internal Server Error" });
	}
};
module.exports = {
	createUser,
	getUsers,
	singleUser,
	updateUser,

	loginUser,
};
