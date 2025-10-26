const express = require('express');
const connectDB = require('./appMongoose');
const userRoutes = require('./routes/user-routes');
const bookRoutes = require('./routes/book-routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8050;

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000', // Your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Routes
app.use('/user', userRoutes);
app.use('/book', bookRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});