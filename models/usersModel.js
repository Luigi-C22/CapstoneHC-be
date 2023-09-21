const mongoose =  require("mongoose");

/* questo è lo schema per gli utenti che si registrano */

const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: false,
            default: "https://picsum.photos/200/200",
        },
    },
    {
        timestamps: true,
        strict: true,
    },

);


module.exports = mongoose.model("User", UserSchema, "users");