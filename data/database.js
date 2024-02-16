const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const users = () => {
    return getDatabase().db().collection('Users');
} 

const games = () => {
    return getDatabase().db().collection('Games');
} 

const characters = () => {
    return getDatabase().db().collection('Characters');
} 

const attributes = () => {
    return getDatabase().db().collection('Attributes');
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
    users,
    characters,
    attributes,
    games
};