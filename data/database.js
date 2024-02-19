const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const about = () => {
    return getDatabase().db().collection('about');
} 

const education = () => {
    return getDatabase().db().collection('education');
} 

const experience = () => {
    return getDatabase().db().collection('experience');
} 

const projects = () => {
    return getDatabase().db().collection('projects');
} 

const technologies = () => {
    return getDatabase().db().collection('technologies');
} 

const initDb = (callback) => {
    if (database) {
        console.log('Db is already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URl).then((client) => {
        database = client;
        callback(null, database);
    }).catch((err) => {
        callback(err);
    });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized');
    }
    return database;
}

module.exports = {
    initDb,
    getDatabase,
    about,
    education,
    experience,
    projects,
    technologies
};