const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Create
const addExperience = async (req, res) => { 
    //#swagger.tags=['Experience']
    const experience = {
            visible: req.body.visible,
            name: req.body.name,
            date: req.body.date,
            instituition: req.body.instituition,
            bullets: req.body.bullets
    };
    
    mongodb.experience().insertOne(experience).then( response => {
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the user.');
        }
    })
};

// Read
const getAll = async (req, res) => {
    //#swagger.tags=['Experience']
    const result = await mongodb.experience().find();
    result.toArray().then((experiences) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(experiences);
    }).catch((err) => {
        console.log(err);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Experience']
    const experienceId = new ObjectId(req.params.id);
    const result = await mongodb.experience().find({_id: experienceId});
    result.toArray().then((experiences) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(experiences[0]);
    }).catch((err) => {
        console.log(err);
    });
};

// Update
const updateExperience = async (req, res) => { 
    //#swagger.tags=['Experience']
    const id = new ObjectId(req.params.id);
    const experience = {
        visible: req.body.visible,
        name: req.body.name,
        date: req.body.date,
        instituition: req.body.instituition,
        bullets: req.body.bullets
    }

    mongodb.experience().replaceOne({_id: id}, experience)
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
const deleteExperience = async (req, res) => { 
    //#swagger.tags=['Experience']
    const id = new ObjectId(req.params.id);

    mongodb.experience().deleteOne({_id: id})
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
    addExperience,
    getAll,
    getSingle,
    updateExperience,
    deleteExperience
};