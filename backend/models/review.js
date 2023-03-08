import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
    productId: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reviewer_name: { type: String, required: true },
    review: { type: String, required: true },
    star: { type: String, required: true },
    date: { type: Date, required: true },
    img: { type: String, required: true },
});

module.exports = mongoose.model("Review", reviewSchema);