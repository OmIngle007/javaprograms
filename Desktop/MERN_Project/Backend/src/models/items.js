import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    imageUrl: { type: String },
    imagePublicId: { type: String },
    status: { type: String, enum: ["lost", "found"], required: true },
    location: { type: String },
    date: { type: Date, required: true },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isResolved: { type: Boolean, default: false },
    resolvedWith: { type: mongoose.Schema.Types.ObjectId, ref: "Claim", default: null },
  }, { timestamps: true });
  



export default mongoose.model("Item", itemSchema);