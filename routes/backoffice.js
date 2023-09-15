const express = require('express');
const mongoose = require('mongoose');
const Backoffice = require ('../models/backOfficeModel');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const {cloudinaryStorage} = require ('multer-storage-cloudinary');
const crypto = require ('crypto');

const backoffice = express.Router()

//get all
backoffice.get('/backoffice', async (req, res) => {
    try {
        const posts = await Backoffice.find()
        res.status(200).send({
            statusCode: 200,
            posts: posts
        })
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