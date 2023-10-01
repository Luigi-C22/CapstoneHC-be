const express = require('express');
const multer = require('multer');
const {CloudinaryStorage} = require ('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const Backoffice = require ('../models/backOfficeModel');
const crypto = require ('crypto');
require('dotenv').config();


const backoffice = express.Router();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'hyperCar',
        format: async (req, file) => ['png', 'jpg'].join('|'),
        public_id: (req, file) => file.name,
    },
});

const upload = multer({ storage: cloudStorage });

//get all
backoffice.get('/backoffice', async (req, res) => {
    try {
        const posts = await Backoffice.find();
        res.status(200).send({
            statusCode: 200,
            posts: posts,
        });
    } catch (error) {
        res.status(500).send({
            stusCode: 500,
            message: 'Internal server error',
            error,
        });
    }
});

//new post del backoffice
 backoffice.post('/backoffice', 
    async (req, res) => {

        const addCar = new Backoffice({
            carBrand: req.body.carBrand,
            carName: req.body.carName,
            carPicture: req.body.carPicture,
            price: req.body.price,
            contact: req.body.contact,
            description: req.body.description
        })

        try {
            const car = await addCar.save();

            res.status(201).send({
            message: "New car added successfully!",
            payload: car,
        })

        } catch (error) {
            res.status(500).send({
                statusCode: 500,
                message: "Internal server error",
                error,
            });
        }  
        
}); 




module.exports = backoffice;