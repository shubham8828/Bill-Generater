import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    company: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    bills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bill',unique:true }]
});

export default mongoose.model("User", userSchema);
