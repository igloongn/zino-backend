const express = require("express");
const morgan = require("morgan");

const mongoose = require("mongoose");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

var cors = require("cors");

const { userRouter } = require("./src/routes/userRoutes");

const dbURI = "mongodb://localhost:27017/ZINO";
mongoose
	.connect(dbURI, {})
	.then((res) => {
		start();
	})
	.catch((err) => console.error(err));

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => res.status(201).json({ message: "Lets Go" }));
app.use("/api", userRouter);

app.use((req, res, next) => {
	res.status(404).json({
		msg: "General Error: Sorry this page Cannot be found",
	});
});

const start = () => {
	app.listen(1234, () => {
		console.log("Server listening on port 1234....");
	});
};
