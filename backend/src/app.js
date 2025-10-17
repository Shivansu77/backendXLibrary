const express = require('express');
const connectDB = require('./appMongoose');  // Fix: Updated import path
const userRoutes = require('./routes/user-routes');

const app = express();
const PORT = process.env.PORT || 8050;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});