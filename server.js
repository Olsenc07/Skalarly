// Backend SERVER NODE.JS Using ES6 module
import dotenv from 'dotenv';
if (process.env.NODE_ENV === 'development') {
    dotenv.config();
  }
const db_auth = process.env.MONGODB_AUTH;
const db_content = process.env.MONGODB_CONTENT;
import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
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
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
const mongooseAuth = mongoose.createConnection();
const mongooseContent = mongoose.createConnection();
// API Routes
import accountManagementRoute from './backend/routes/account-management.js';
import authorizeRoute from './backend/routes/authorize.js';
import skalarsRoute from './backend/routes/skalars.js';
import canadianRoute from './backend/routes/canadian-schools.js';
const __filename = fileURLToPath(import.meta.url);
console.log('hey', __filename);
const __dirname = dirname(__filename);
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
  // App Configuration
  const app = express();
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false}));
  app.use(switchDatabase);
  //  API Routes
  app.use("/api/authorize", apiLimiter, authorizeRoute);
  app.use("/api/accountManagement", accountManagementRoute);
  app.use("/api/skalars", skalarsRoute);
  app.use("/api/canada", canadianRoute);

// Frontend SSR 
import { CommonEngine } from '@angular/ssr';
import { APP_BASE_HREF } from '@angular/common';
import { AppServerPromise } from './dist/server/main.js';

// Serve static files and SSR
const PORT = process.env.PORT || 3000;
const DIST_FOLDER = join(__dirname, './dist/skalarly-frontend');
app.set('view engine', 'html');
app.set('views', DIST_FOLDER);
app.use(express.static(DIST_FOLDER, { index: false }));

app.get('*', async (req, res) => {
    try {
      const commonEngine = new CommonEngine();
      const options = {
        documentFilePath: join(DIST_FOLDER, 'index.html'),
        url: req.url,
        publicPath: DIST_FOLDER,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]
      };
      const html = await commonEngine.render({
        bootstrap: AppServerPromise(), 
        ...options
      });
      res.send(html);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  app.use((error, req, res, next) => {
    // Default to 500 server error
    const status = error.status || 500;
    res.status(status).json({
      message: error.message
    });
  });
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
