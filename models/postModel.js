const mongoose = require('mongoose');

/* questo è lo schema per i post delle auto usate degli utenti */

const PostModelSchema = new mongoose.Schema(

    {
        carBrand: {
            type: String,
            required: false,
        },
        carName: {
            type: String,
            required: false,
        },
        carPicture: {
            type: String,
            required: false,
             },
        year: {
            type: String,
            required: false,
        },
        price: {
            type: Number,
            required: false,
        },
        contact: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        authorName: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }

    },
    {
        timestamps: true,
        strict: true,
    }
);

module.exports = mongoose.model("Post", PostModelSchema, "posts");