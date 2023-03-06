const mongoose = require('mongoose');

require('dotenv').config({path: 'dev.env'});

const USER = process.env.MONGO_USER;
const PASSWORD = process.env.MONGO_PASSWORD;
const HOST = process.env.MONGO_HOST;
const auth_db = process.env.MONGO_auth_db;

const connnectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@${HOST}/${auth_db}`);
        console.log('DB connected!!')
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
}

module.exports = connnectDB