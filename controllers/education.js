const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

// Create
const addEducation = async (req, res) => { 
    //#swagger.tags=['Education']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const education = {
            visible: req.body.visible,
            name: req.body.name,
            date: req.body.date,
            instituition: req.body.instituition,
            description: req.body.description
    };
    
    mongodb.education().insertOne(education).then( response => {
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the user.');
        }
    })
};

// Read
const getAll = async (req, res) => {
    //#swagger.tags=['Education']
    const result = await mongodb.education().find();
    result.toArray().then((educations) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(educations);
    }).catch((err) => {
        console.log(err);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Education']
    const educationId = new ObjectId(req.params.id);
    const result = await mongodb.education().find({_id: educationId});
    result.toArray().then((educations) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(educations[0]);
    }).catch((err) => {
        console.log(err);
    });
};

// Update
const updateEducation = async (req, res) => { 
    //#swagger.tags=['Education']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = new ObjectId(req.params.id);
    const education = {
        visible: req.body.visible,
        name: req.body.name,
        date: req.body.date,
        instituition: req.body.instituition,
        description: req.body.description
    }

    mongodb.education().replaceOne({_id: id}, education)
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
const deleteEducation = async (req, res) => { 
    //#swagger.tags=['Education']
    const id = new ObjectId(req.params.id);

    mongodb.education().deleteOne({_id: id})
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
    addEducation,
    getAll,
    getSingle,
    updateEducation,
    deleteEducation
};