const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

// Create
const addProjects = async (req, res) => { 
    //#swagger.tags=['Projects']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const projects = {
        id: req.body.id,
        name: req.body.name,
        subtitle: req.body.subtitle,
        filter: req.body.filter,
        thumb: req.body.thumb,
        portfolio: req.body.portfolio,
        images: req.body.images,
        description: req.body.description,
        skills: req.body.skills,
        type: req.body.type,
        category: req.body.category,
        date: req.body.date,
        access: req.body.access,
        sourceCode: req.body.sourceCode
    };
    
    mongodb.projects().insertOne(projects).then( response => {
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the user.');
        }
    })
};

// Read
const getAll = async (req, res) => {
    //#swagger.tags=['Projects']
    const result = await mongodb.projects().find();
    result.toArray().then((projectss) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(projectss);
    }).catch((err) => {
        console.log(err);
    });
};

const getFiltered = async (req, res) => {
    //#swagger.tags=['Projects']
    const filter = new ObjectId(req.params.filter);
    const result = await mongodb.projects().find({_filter: filter});
    result.toArray().then((projectss) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(projectss);
    }).catch((err) => {
        console.log(err);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Projects']
    const projectsId = new ObjectId(req.params.id);
    const result = await mongodb.projects().find({_id: projectsId});
    result.toArray().then((projectss) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(projectss[0]);
    }).catch((err) => {
        console.log(err);
    });
};

// Update
const updateProjects = async (req, res) => { 
    //#swagger.tags=['Projects']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = new ObjectId(req.params.id);
    const projects = {
        id: req.body.id,
        name: req.body.name,
        subtitle: req.body.subtitle,
        filter: req.body.filter,
        thumb: req.body.thumb,
        portfolio: req.body.portfolio,
        images: req.body.images,
        description: req.body.description,
        skills: req.body.skills,
        type: req.body.type,
        category: req.body.category,
        date: req.body.date,
        access: req.body.access,
        sourceCode: req.body.sourceCode
    }

    mongodb.projects().replaceOne({_id: id}, projects)
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
const deleteProjects = async (req, res) => { 
    //#swagger.tags=['Projects']
    const id = new ObjectId(req.params.id);

    mongodb.projects().deleteOne({_id: id})
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
    addProjects,
    getAll,
    getFiltered,
    getSingle,
    updateProjects,
    deleteProjects
};