import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    Sr: { type: String, required: true, },
    product: { type: String, required: true },
    rate: { type: Number, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const billSchema = new mongoose.Schema({
    billNo: { type: String, unique: true, required: true },
    items: [itemSchema],
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model("Bill", billSchema);
