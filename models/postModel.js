const mongoose = require('mongoose');

/* questo è lo schema per i post delle auto usate degli utenti */

const PostModelSchema = new mongoose.Schema(

    {
        carBrand: {
            type: String,
            required: [false, 'Car brand is required'],
        },
        carName: {
            type: String,
            required: [false, 'Car name is required'],
        },
        carPicture: {
            type: String,
            required: [false, 'A car picture is required'],
             },
        year: {
            type: String,
            required: [false, 'The year of registration is required'],
        },
        price: {
            type: Number,
            required: [false, 'Price is required'],
        },
        contact: {
            type: String,
            required: [false, 'Contact is required'],
        },
        description: {
            type: String,
            required: [false, 'A 10 character description is required'],
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