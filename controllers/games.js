const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

// Create
const addGame = async (req, res) => { 
    //#swagger.tags=['Games']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const game = {
            Name: req.body.Name,
            Master: req.body.Master,
            Players: req.body.Players,
            Description: req.body.Description,
            Attributes: req.body.Attributes
    };
    
    mongodb.games().insertOne(game).then( response => {
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the game.');
        }
    })
};

// Read
const getByID = async (req, res) => {
    //#swagger.tags=['Games']
    const gameId = new ObjectId(req.params.gameId);
    const result = await mongodb.games().find({_id: gameId});
    result.toArray().then((games) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(games[0]);
    }).catch((err) => {
        console.log(err);
    });
};

const getByMaster = async (req, res) => {
    //#swagger.tags=['Games']
    const masterId =req.params.userId;
    const result = await mongodb.games().find({"Master": masterId});
    result.toArray().then((games) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(games);
    }).catch((err) => {
        console.log(err);
    });
};

const getByUser = async (req, res) => {
    //#swagger.tags=['Games']
    const playerId = req.params.userId;
    const result = await mongodb.games().find({ "Players": { $elemMatch: { $eq: playerId } } });
    result.toArray().then((games) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(games);
    }).catch((err) => {
        console.log(err);
    });
};

// Update
const updateGame = async (req, res) => { 
    //#swagger.tags=['Games']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = new ObjectId(req.params.gameId);
    const game = {
        Name: req.body.Name,
        Master: req.body.Master,
        Players: req.body.Players,
        Description: req.body.Description,
        Attributes: req.body.Attributes
    };

    mongodb.games().replaceOne({_id: id}, game)
    .then( response => {
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else if (response.matchedCount < 1) {
            res.status(404).json(response.error || `Not found any Game with id ${id}`);
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the Game.');
        }
    })
};

// Delete
const deleteGame = async (req, res) => { 
    //#swagger.tags=['Games']
    const id = new ObjectId(req.params.gameId);

    mongodb.games().deleteOne({_id: id})
    .then( response => {
        console.log(response)
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the Game.');
        }
    })
};
module.exports = {
    addGame,
    getByID,
    getByMaster,
    getByUser,
    updateGame,
    deleteGame
};