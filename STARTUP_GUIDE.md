# Library Management System - Startup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

## Setup Instructions

### 1. MongoDB Setup
1. Create a new MongoDB Atlas cluster
2. Create a database user with read/write permissions
3. Get your connection string
4. Replace the MONGO_URI in `backend/src/appMongoose.js` with your new connection string

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
The backend will run on `http://localhost:8050`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will run on `http://localhost:3000`

## Project Structure

### Backend (`/backend`)
- **Port**: 8050
- **Main file**: `src/app.js`
- **Models**: `src/models/` (User, Book, IssuedBook)
- **Controllers**: `src/controllers/`
- **Routes**: `src/routes/`
- **Database**: MongoDB Atlas

### Frontend (`/frontend`)
- **Port**: 3000
- **Framework**: React with Tailwind CSS
- **API Base URL**: `http://localhost:8050`

## API Endpoints

### Books
- `POST /book/add` - Add new book (Librarian only)
- `POST /book/all` - Get all books

### Users
- `POST /user/register` - Register user
- `POST /user/login` - Login user

### Issued Books
- `GET /issued/all` - Get all issued books
- `POST /issued/issue` - Issue a book
- `POST /issued/return` - Return a book

## Database Collections
- `users` - User accounts (students and librarians)
- `books` - Book inventory
- `issuedbooks` - Book issue records

## Default User Roles
- `admin` - Librarian (can add books, issue books)
- `user` - Student (can view books)

## Troubleshooting

### Backend Issues
1. **Connection Refused**: Make sure backend is running on port 8050
2. **MongoDB Connection**: Check your connection string and network access
3. **Empty Data**: Verify collection names match model definitions

### Frontend Issues
1. **CORS Errors**: Backend has CORS configured for localhost:3000
2. **API Errors**: Check browser console and backend logs

## Quick Start Commands

### Terminal 1 (Backend)
```bash
cd library-managent/backend
npm start
```

### Terminal 2 (Frontend)
```bash
cd library-managent/frontend
npm start
```

## Environment Variables (Optional)
Create `.env` file in backend directory:
```
MONGO_URI=your_mongodb_connection_string
PORT=8050
```