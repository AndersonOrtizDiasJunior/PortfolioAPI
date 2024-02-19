const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

// Create
const addAttribute = async (req, res) => { 
    //#swagger.tags=['Attributes']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const attribute = {
            name: req.body.Name,
            Type: req.body.Type
    };
    
    mongodb.attributes().insertOne(attribute).then( response => {
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the attribute.');
        }
    })
};

// Read
const getByGame = async (req, res) => {
    //#swagger.tags=['Attributes']
    const gameId = new ObjectId(req.params.gameId);
    const result = await mongodb.games().find({_id: gameId});
    result.toArray().then(async (games) => {
        let attributeIDs = games[0].Attributes
        let attributes = []

        for (const rawID of attributeIDs) {
            const attId = new ObjectId(rawID);
            try {
                let idResult = await mongodb.attributes().find({ _id: attId });
                let atts = await idResult.toArray();
                attributes.push(atts[0]);
            } catch (err) {
                console.log(err);
            }
        }
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(attributes);
    }).catch((err) => {
        console.log(err);
    });
};

const getByID = async (req, res) => {
    //#swagger.tags=['Attributes']
    const attId = new ObjectId(req.params.attId);
    const result = await mongodb.attributes().find({_id: attId});
    result.toArray().then((attributes) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(attributes[0]);
    }).catch((err) => {
        console.log(err);
    });
};

// Update
const updateAttribute = async (req, res) => { 
    //#swagger.tags=['Attributes']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = new ObjectId(req.params.id);
    const attribute = {
        name: req.body.Name,
        Type: req.body.Type
    };

    mongodb.attributes().replaceOne({_id: id}, attribute)
    .then( response => {
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else if (response.matchedCount < 1) {
            res.status(404).json(response.error || `Not found any Attribute with id ${id}`);
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the attribute.');
        }
    })
};

// Delete
const deleteAttribute = async (req, res) => { 
    //#swagger.tags=['Attributes']
    const id = new ObjectId(req.params.id);

    mongodb.attributes().deleteOne({_id: id})
    .then( response => {
        console.log(response)
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the attribute.');
        }
    })
};


module.exports = {
    addAttribute,
    getByGame,
    getByID,
    updateAttribute,
    deleteAttribute
};