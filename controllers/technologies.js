const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

// Create
const addTechnologies = async (req, res) => { 
    //#swagger.tags=['Technologies']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const technologies = {
        id: req.body.id,
        logos: req.body.logos
    };
    
    mongodb.technologies().insertOne(technologies).then( response => {
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the user.');
        }
    })
};

// Read
const getAll = async (req, res) => {
    //#swagger.tags=['Technologies']
    const result = await mongodb.technologies().find();
    result.toArray().then((technologiess) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(technologiess);
    }).catch((err) => {
        console.log(err);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Technologies']
    const result = await mongodb.technologies().find({"project": req.params.project});
    result.toArray().then((technologiess) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(technologiess[0]);
    }).catch((err) => {
        console.log(err);
    });
};

// Update
const updateTechnologies = async (req, res) => { 
    //#swagger.tags=['Technologies']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = new ObjectId(req.params.id);
    const technologies = {
        id: req.body.id,
        logos: req.body.logos
    }

    mongodb.technologies().replaceOne({_id: id}, technologies)
    .then( response => {
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else if (response.matchedCount < 1) {
            res.status(404).json(response.error || `Not found any Contact with id ${id}`);
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the user.');
        }
    })
};

// Delete
const deleteTechnologies = async (req, res) => { 
    //#swagger.tags=['Technologies']
    const id = new ObjectId(req.params.id);

    mongodb.technologies().deleteOne({_id: id})
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
    addTechnologies,
    getAll,
    getSingle,
    updateTechnologies,
    deleteTechnologies
};