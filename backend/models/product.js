import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
	title: { type: String, required: true },
	price: { type: String, required: true },
	collection_: { type: String, required: true },
	color: { type: String, required: true },
	category: { type: String, required: true },
	img: { type: String, required: true },
	feature: { type: Boolean, required: true },
});

export const Product = mongoose.model("Product", productSchema);