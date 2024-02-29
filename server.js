// Backend SERVER NODE.JS Using ES6 module
import dotenv from 'dotenv';
    dotenv.config();

import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
const db_auth = process.env.MONGODB_AUTH;
const db_content = process.env.MONGODB_CONTENT;
console.log('a', db_auth);
console.log('b', db_content);

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

// API Routes
import accountManagementRoute from './backend/routes/account-management.js';
import authorizeRoute from './backend/routes/authorize.js';
import skalarsRoute from './backend/routes/skalars.js';
import canadianRoute from './backend/routes/canadian-schools.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//  Responsive DataBase connection
// Initialize mongoose connections
let mongooseAuth, mongooseContent;

const connectAuthDB = async () => {
  if (!mongooseAuth || mongooseAuth.readyState === 0) {
    try {
      mongooseAuth = mongoose.createConnection(db_auth);
      console.log('Connected to Auth database!');
    } catch (error) {
      console.error('MongoDB Auth connection error:', error);
    }
  }
};

const connectContentDB = async () => {
  if (!mongooseContent || mongooseContent.readyState === 0) {
    try {
      mongooseContent = mongoose.createConnection(db_content);
      console.log('Connected to Content database!');
    } catch (error) {
      console.error('MongoDB Content connection error:', error);
    }
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
import '@angular/compiler'; // dev
import { CommonEngine } from '@angular/ssr';
import { APP_BASE_HREF } from '@angular/common';


// Serve static files and SSR
const PORT = process.env.PORT || 4200;
const DIST_FOLDER = join(__dirname, '../skalarly-fs/dist/skalarly-frontend/browser');
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html'), 'utf8');

console.log('hey 77', DIST_FOLDER);
console.log('777 howdy', template);

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);
app.use(express.static(DIST_FOLDER, { index: false }));

app.get('*', async (req, res) => {
      const options = {
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
        url: req.url,
        publicPath: DIST_FOLDER,
        document: template,
        documentFilePath: join(DIST_FOLDER, 'index.html'),
      };
          const commonEngine = new CommonEngine();
          import('../skalarly-fs/dist/skalarly-frontend/server/main.js').then(async module => {
            const AppServerModule = module.AppServerModule;
    try {
          const html = await commonEngine.render(AppServerModule, 
            ...options
          );
          res.send(html);
        } catch (error) {
          console.error(error);
          res.status(500).send('Error during server-side rendering');
        }
      }).catch(error => {
        console.error('Module import error:', error);
        res.status(500).send('Server error');
      });
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
