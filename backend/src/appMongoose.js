const mongoose = require('mongoose');

// MongoDB Atlas connection string
// Replace <username> and <password> with your actual MongoDB Atlas credentials
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://shivansubisht77_db_user:kickbash@cluster0.ioib2jp.mongodb.net/newnov?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`MongoDB Atlas Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;