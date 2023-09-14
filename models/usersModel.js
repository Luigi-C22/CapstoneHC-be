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
    },
    {
        timestamps: true,
        strict: true,
    },

);


module.exports = mongoose.model("User", UserSchema, "users");