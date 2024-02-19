const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

// Create
const addUser = async (req, res) => { 
    //#swagger.tags=['Users']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let hashedPassword
    try {
      hashedPassword = await bcrypt.hashSync(req.body.Password, 10)
    } catch (error) {
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }

    const user = {
        Name: req.body.Name,
        Username: req.body.Username,
        Email: req.body.Email,
        Password: hashedPassword,
        Birthdate: req.body.Birthdate,
        Gender: req.body.Gender,
        Country: req.body.Country
    };
    
    mongodb.users().insertOne(user).then( response => {
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the user.');
        }
    })
};

// Read
const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    const result = await mongodb.users().find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    }).catch((err) => {
        console.log(err);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.users().find({_id: userId});
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    }).catch((err) => {
        console.log(err);
    });
};

// Update
const updateUser = async (req, res) => { 
    //#swagger.tags=['Users']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = new ObjectId(req.params.id);
    let hashedPassword
    try {
      hashedPassword = await bcrypt.hashSync(req.body.Password, 10)
    } catch (error) {
        res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }

    const user = {
        Name: req.body.Name,
        Username: req.body.Username,
        Email: req.body.Email,
        Password: hashedPassword
    };

    mongodb.users().replaceOne({_id: id}, user)
    .then( response => {
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else if (response.matchedCount < 1) {
            res.status(404).json(response.error || `Not found any User with id ${id}`);
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the user.');
        }
    })
};

// Delete
const deleteUser = async (req, res) => { 
    //#swagger.tags=['Users']
    const id = new ObjectId(req.params.id);

    mongodb.users().deleteOne({_id: id})
    .then( response => {
        console.log(response)
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the user.');
        }
    })
};


module.exports = {
    addUser,
    getAll,
    getSingle,
    updateUser,
    deleteUser
};