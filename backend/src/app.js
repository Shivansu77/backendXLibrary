const express = require('express');
const connectDB = require('./appMongoose');
const userRoutes = require('./routes/user-routes');
const bookRoutes = require('./routes/book-routes');
const issuedRoutes = require('./routes/issued-routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8050;

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'], // Your React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Add a middleware to set a default user for all requests
app.use((req, res, next) => {
  req.user = { id: 'test-user-id', role: 'admin' };
  next();
});

// Direct test endpoint that bypasses all middleware
app.get('/test-issued-books', (req, res) => {
  // Return hardcoded sample data
  res.status(200).json([
    {
      id: '1',
      bookTitle: 'The Great Gatsby',
      studentName: 'John Doe',
      issueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'issued'
    },
    {
      id: '2',
      bookTitle: 'To Kill a Mockingbird',
      studentName: 'Jane Smith',
      issueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      status: 'overdue'
    }
  ]);
});

// Routes
app.use('/user', userRoutes);
app.use('/book', bookRoutes);
app.use('/issued', issuedRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});