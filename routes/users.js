const express = require('express');
const mongoose = require('mongoose');
const UsersModel = require('../models/usersModel');
const usersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');

const user = express.Router()

//get all - otteniamo la lista completa degli utenti
user.get('/users', async (req, res) => {
    try {
        const users = await usersModel.find()

        res.status(200).send({
            statusCode: 200,
            users: users,
        });
    } catch (error) {
        res.status(500).send({
            satusCode: 500,
            message: 'Internal server error',
            error,
        });

    }
});

//get by id - otteniamo un singolo utente tramite id
user.get('/users/:userId', async (req, res) => {

const { userId }  = req.params;

    try {
        const userById = await UsersModel.findById(userId)

        res.status(200).send({
            statusCode: 200,
            userById,
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error,
        }); 
    }
});

//post users - aggiungiamo nuovi utenti
user.post('/users', async (req, res) => {

    const salt = await bcrypt.genSalt(10) // complessità algoritmo di criptatura
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new usersModel({
        userName: req.body.userName,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPassword,
        dob: req.body.dob,
        avatar: req.body.avatar
    })

    try {
        const user = await newUser.save();

        res.status(201).send({
            statusCode: 201,
            message: 'User saved successfully',
            payload: user,
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'internal server error',
            error,
        });
    }
});

//user patch - modifichiamo un valore di un utente tramite ricerca per id
user.patch('/users/:id', async (req, res) => {
    const { id } = req.params

    const userExist = await UsersModel.findById(id)

    if (!userExist) {
        return res.status(404).send({
            statusCode: 404,
            message: `User with id ${id} not found!`,
        })
    }
    try {
        const userId = id;
        const userToUpdate = req.body;
        const options = { new: true };

        const result = await UsersModel.findByIdAndUpdate(userId, userToUpdate, options)

        res.status(200).send({
            statusCode: 200,
            message: `Post with id ${id} modified successfully!!`,
            result,
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 5000,
            message: 'Internal server error',
            error,
        });
    }
});

//user delete -  eliminiamo un utente ricercandolo tramite id
user.delete('/users/:id', async (req, res) => {

    const { id } = req.params

    const userExist = await UsersModel.findById(id)

    if (!userExist) {
        return res.status(404).send({
            statusCode: 404,
            message: `User with id ${id} not found!`,
        })
    }

    try {
        const userToDelete = await UsersModel.findByIdAndDelete(id)

        res.status(200).send({
            statusCode: 200,
            message: `User with id ${id} deleted successfully`,
        });

    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: 'Internal server error',
            error,
        });
    }
});

module.exports = user;