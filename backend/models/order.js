import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
    productId: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    date: { type: Date, required: true },
    total: { type: Number, required: true },
    quantity: { type: Number, required: true },
    // shipping: { type: Object, required: true },
    // delivery_status: { type: String, default: "pending" },
    // payment_status: { type: String, required: true },
});

export const Order = mongoose.model("Order", orderSchema);
