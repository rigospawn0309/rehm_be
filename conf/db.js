const mongoose = require('mongoose');
require('dotenv').config({path: './.env'});

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_DB
  } = process.env;
  
  const options = {
    useNewUrlParser: true,
    connectTimeoutMS: 10000
  };
const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}?authSource=admin`;
  
const connnectDB = async () => {
    try {
        await mongoose.connect(url,options);
        console.log('DB connected!!');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

module.exports = connnectDB