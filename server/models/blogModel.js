import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories", // Changed to "ref"
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // Changed to "ref"
        required: true,
    },
}, { timestamps: true });

const blogModel = mongoose.model("blogs", blogSchema);
export default blogModel;
