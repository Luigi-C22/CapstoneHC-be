const express = require('express');
const mongoose = require('mongoose');
const PostsModel = require('../models/postModel');
const postModel = require('../models/postModel');
const { postBodyParams, validatePostBody } = require('../middlewares/postValidation');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const crypto = require('crypto');
const verifyToken = require('../middlewares/verifyToken');

require('dotenv').config();
const post = express.Router();

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

// configurazione di multer per il salvataggio locale dei file immagine
const internalStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/uploads')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${new Date().toISOString()}-${crypto.randomUUID()}`;
        const fileExt = file.originalname.split('.').pop();
        cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`)
    },
});

const uploads = multer({ storage: internalStorage });
// (riga sopra) fine configurazione di multer
const cloudUpload = multer({ storage: cloudStorage });

post.post(
    '/posts/cloudUpload', verifyToken,
    cloudUpload.single('carPicture'),
    async (req, res) => {
        try {
            res.status(200).json({ carPicture: req.file.path });
        } catch (error) {
            console.error('File upload failed', error);
        }
    });

post.post('/posts/internalUpload', uploads.single('carPicture'), async (req, res) => {
    try {
        res.status(200).json({ carPicture: req.file.path });
    } catch (error) {
        console.error('File upload failed');
        res.status(500).send({
            statusCode: 500,
            message: 'upload not completed correctly',
        });

    }
});

//get all con pagination
post.get('/posts', async (req, res) => {

    //pagination
    const { page = 1, pageSize = 4 } = req.query

    try {
        const posts = await PostsModel.find()
            .limit(pageSize)
            .skip((page - 1) * pageSize)
            .populate('authorName', 'userName email');

        const totalPosts = await PostsModel.count()

        res.status(200).send({
            statusCode: 200,
            totalPosts: totalPosts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts/pageSize),
            pageSize: pageSize,
            posts: posts
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error,
        });
    }
});


//get by id
post.get('/posts/:postId', async (req, res) => {

    const { postId } = req.params;

    try {
        const postById = await PostsModel.findById(postId)

        res.status(200).send({
            statusCode: 200,
            postById,
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error,
        });
    }
})


//post 
post.post('/posts', postBodyParams, validatePostBody,
    async (req, res) => {

        const newPost = new PostsModel({
            carBrand: req.body.carBrand,
            carName: req.body.carName,
            carPicture: req.body.carPicture,
            year: req.body.year,
            price: Number(req.body.price),
            contact: req.body.contact,
            description: req.body.description,
            authorName: req.body.authorName
        })

        try {
            const post = await newPost.save();

            res.status(201).send({
                statusCode: 201,
                message: 'Post saved successfully',
                payload: post,
            })
        } catch (error) {
            res.status(500).send({
                statusCode: 500,
                message: 'Internal server error',
                error,
            });
        }
    });


post.patch('/posts/:id', async (req, res) => {
    const { id } = req.params

    const postExist = await PostsModel.findById(id)

    if (!postExist) {
        return res.status(404).send({
            statusCode: 404,
            message: `Post with id ${id} not found!`,
        })
    }
    try {
        const postId = id;
        const dataToUpdate = req.body;
        const options = { new: true };

        const result = await PostsModel.findByIdAndUpdate(postId, dataToUpdate, options)

        res.status(200).send({
            statusCode: 200,
            message: `Post with id ${id} modified successfully!!`,
            result,
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error,
        });
    }
});

post.delete('/posts/:id', async (req, res) => {

    const { id } = req.params

    const postExist = await PostsModel.findById(id)

    if (!postExist) {
        return res.status(404).send({
            statusCode: 404,
            message: `Post with id ${id} not found`,
        });
    }

    try {
        const postToDelete = await PostsModel.findByIdAndDelete(id)

        res.status(200).send({
            statusCode: 200,
            message: `Post with id ${id} deleted successfully`,
        });

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "Internal server error",
            error,
        });
    }
});

module.exports = post;