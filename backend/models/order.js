import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
    date: { type: Date, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
