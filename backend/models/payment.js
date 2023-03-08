import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = new Schema({
    orderId: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    payment: { type: Object, required: true },
});

module.exports = mongoose.model("Payment", paymentSchema);