const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
//This is an example middleware
// const logger = require('./middleware/logger');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });
// Route files
const bootcamps = require('./routes/bootcamps');

// Connect to database
connectDB();


const app = express();

// Activate/use logger middleware
//app.use(logger);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
//Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});