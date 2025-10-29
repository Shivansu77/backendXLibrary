const mongoose = require('mongoose');

// MongoDB Atlas connection string
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://shivansubisht77_db_user:shark77@cluster0.o2ynz3t.mongodb.net/libraryapp?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Atlas Connected: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`MongoDB Atlas Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;