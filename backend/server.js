
import express from "express";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";

import userRouter from "./routes/user";
import initProductRouter from "./routes/init";

const app = express();
const port = process.env.PORT || 5000;
const dbUrl = process.env.DB_URl;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

// routes
app.use("/user", userRouter);
app.use("/init", initProductRouter);


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
	
// connect to the server
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});