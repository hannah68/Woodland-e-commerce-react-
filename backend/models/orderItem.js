import mongoose from "mongoose";
const { Schema } = mongoose;

const orderItemSchema = new Schema({
    orderId: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    productId: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    quantity: { type: Number, required: true },
    unit_price: { type: Number, required: true },
});

module.exports = mongoose.model("Order_Item", orderItemSchema);
