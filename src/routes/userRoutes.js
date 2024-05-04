// routes/userRoutes.js
const express = require("express");
const {
	createUser,
	getUsers,
	loginUser,
	singleUser,
	updateUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/users").get(getUsers).post(createUser);
userRouter.route("/single/:userId").get(singleUser);
userRouter.route("/users/update/:id").put(updateUser);

userRouter.route("/login").post(loginUser);

module.exports = {
	userRouter,
};
