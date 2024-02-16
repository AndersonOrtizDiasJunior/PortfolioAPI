const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

// Create
const addChar = async (req, res) => { 
    //#swagger.tags=['Characters']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const char = {
        Game: req.body.Game,
        User: req.body.User,
        Params: req.body.Params
    };
    
    mongodb.characters().insertOne(char).then( response => {
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the character.');
        }
    })
};

// Read
const getById = async (req, res) => {
    //#swagger.tags=['Characters']
    const charId = new ObjectId(req.params.charId);
    const result = await mongodb.characters().find({_id: charId});
    result.toArray().then((chars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(chars[0]);
    }).catch((err) => {
        console.log(err);
    });
};

const getByGame = async (req, res) => {
    //#swagger.tags=['Characters']
    const gameId = req.params.gameId;
    const result = await mongodb.characters().find({Game: gameId});
    result.toArray().then((chars) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(chars);
    }).catch((err) => {
        console.log(err);
    });
};

// Update
const updateChar = async (req, res) => { 
    //#swagger.tags=['Characters']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = new ObjectId(req.params.id);
    const char = {
        Game: req.body.Game,
        User: req.body.User,
        Params: req.body.Params
    };

    mongodb.characters().replaceOne({_id: id}, char)
    .then( response => {
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else if (response.matchedCount < 1) {
            res.status(404).json(response.error || `Not found any Characters with id ${id}`);
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the character.');
        }
    })
};

// Delete
const deleteChar = async (req, res) => { 
    //#swagger.tags=['Characters']
    const id = new ObjectId(req.params.id);

    mongodb.characters().deleteOne({_id: id})
    .then( response => {
        console.log(response)
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the character.');
        }
    })
};


module.exports = {
    addChar,
    getById,
    getByGame,
    updateChar,
    deleteChar
};