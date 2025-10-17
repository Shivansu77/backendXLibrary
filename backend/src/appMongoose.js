const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://shivansubisht77_db_user:%40Shark77@cluster0.yswq0zd.mongodb.net/libApp';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;