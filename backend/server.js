// SERVER NODE.JS Using ES6 module
import dotenv from 'dotenv';
if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}
const port = process.env.PORT || 3000;
const db_auth = process.env.MONGODB_AUTH;
const db_content = process.env.MONGODB_CONTENT;

import express from 'express';
import rateLimit from 'express-rate-limit';
// Define rate limit rule
const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 7, // limit each IP to 7 requests per windowMs
  handler: function (req, res, next) {
    const error = new Error('Too many attempts, please try again after 5 minutes');
    error.status = 429; // Too Many Requests
    next(error);
  }
});

import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
// Browser Push Notifications
import webpush from 'web-push';
// MongoDB
import mongoose from 'mongoose';
// Routes
import accountManagementRoute from './routes/account-management.js';
import authorizeRoute from './routes/authorize.js';
import skalarsRoute from './routes/skalars.js';

import canadianRoute from './routes/canadian-schools.js';


// Constructing __dirname 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// App Variables
const app = express();

const mongooseAuth = mongoose.createConnection();
const mongooseContent = mongoose.createConnection();

//  Responsive DataBase connection
const connectAuthDB = async () => {
  if (mongooseAuth.readyState === 0) {
  try {
      await mongoose.connect(db_auth);
      console.log('Connected to Auth database!');
  } catch (error) {
      console.error('MongoDB Auth connection error:', error);
  }
}
};

// Connection to Content Database
const connectContentDB = async () => {
  try {
      await mongoose.connect(db_content);
      console.log('Connected to Content database!');
  } catch (error) {
      console.error('MongoDB Content connection error:', error);
  }
};

// Middleware to switch databases
const switchDatabase = async (req, res, next) => {
  try {
  if (req.path.startsWith('/')  || req.path.startsWith('/sign-up') || req.path.startsWith('/login')) {
     await connectAuthDB();
  } else {
     await connectContentDB();
     if (mongooseAuth.readyState === 1) { 
      try {
        await mongooseAuth.close();
        console.log('Disconnected from Auth database!');
      } catch (closeError) {
        console.error('Error closing Auth DB connection:', closeError);
      }
    }
  }
  next();
} catch (error) {
  console.error('Error in switchDatabase:', error);
  next(error); 
}
};

app.use(switchDatabase);

// App Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// CORS
app.use((req, res, next) => {
    res.setHeader( "Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type: 'multipart/form-data', Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
 });

// API routes
app.use("/api/authorize",apiLimiter, authorizeRoute);
app.use("/api/accountManagement", accountManagementRoute);
app.use("/api/skalars", skalarsRoute);
app.use("/api/canada", canadianRoute);
app.use((error, req, res, next) => {
  // Default to 500 server error
  const status = error.status || 500;
  res.status(status).json({
    message: error.message
  });
});
const angularAppPath = 
   join(__dirname, 'dist', 'skalarly-frontend', 'skalarly-frontend')
  // : join('/Users/chaseolsen/skalarly-MVP/skalarly-fs/skalarly-frontend/src');

  app.use(express.static(angularAppPath));

  app.get('*', (req, res) => {
    res.sendFile(join(angularAppPath, 'index.html'));
  });

// Server Activation
app.listen(port, () => {
  console.log(`Listening to requests on ${portEnv}`);
})
