import mongoose from "mongoose";
const { Schema } = mongoose;

const addressSchema = new Schema({
    userId: [{ type: Schema.Types.ObjectId, ref: "User" }],
    address: { type: Object, required: true },
});

module.exports = mongoose.model("Address", addressSchema);