const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Read
const getAbout = async (req, res) => {
    //#swagger.tags=['About']
    const result = await mongodb.about().find();
    result.toArray().then((about) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(about);
    }).catch((err) => {
        console.log(err);
    });
};

// Update
const updateAbout = async (req, res) => { 
    //#swagger.tags=['About']
    const id = new ObjectId('65af90366fe4eea8ebbb27f0');
    const about = {
        headline: req.body.headline,
        jobTitle: req.body.jobTitle,
        city: req.body.city,
        phone: req.body.phone,
        email: req.body.email,
        description: req.body.description,
        image: req.body.image,
        whatsapp: req.body.whatsapp
        }

    mongodb.about().replaceOne({_id: id}, about)
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

module.exports = {
    getAbout,
    updateAbout,
};