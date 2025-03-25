import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    plan: { type: String, required: true },
    amount: { type: Number, default: 5 },
    credits: { type: Number, default: 5 },
    payment: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
});

// Ensure uniqueness per user & plan, preventing duplicate transactions for the same plan
transactionSchema.index({ userId: 1, plan: 1 }, { unique: true });

const transactionModel = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default transactionModel;
