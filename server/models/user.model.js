import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: function () {
                // Password is required only for non-AI users
                return !this.isAI;
            },
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "",
        },
        isAI: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
