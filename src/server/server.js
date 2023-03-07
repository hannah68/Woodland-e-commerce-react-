const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(cors());

const port = process.env.PORT || 5000;
const dbUrl = process.env.DB_URl;

// Connect to MongoDB Atlas database
mongoose
	.connect(dbUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connected to MongoDB Atlas database");
	})
	.catch((error) => {
		console.log("Error connecting to MongoDB Atlas database:", error);
	});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
