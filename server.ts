// Backend SERVER NODE.JS Using ES6 module
// For server-side (Node.js environment)
import 'zone.js';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import rateLimit from 'express-rate-limit';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';

// Frontend SSR 
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import bootstrap from './skalarly-frontend/src/main.server';

// API Routes
import accountManagementRoute from './backend/routes/account-management';
import authorizeRoute from './backend/routes/authorize';
import skalarsRoute from './backend/routes/skalars';
import canadianRoute from './backend/routes/canadian-schools';

// DB connection URIs from env variables
const db_auth = process.env['MONGODB_AUTH'] || '';
const db_content = process.env['MONGODB_CONTENT'] || '';

// Rate limiting middleware
const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 7, // limit each IP to 7 requests per windowMs
    handler: (req, res, next) => {
      res.status(429).json({
          error: 'Too many requests, please try again after 5 minutes'
      });
  }
  });
// Initialize mongoose connections
let mongooseAuth: mongoose.Connection, mongooseContent: mongoose.Connection;

//  Responsive DataBase connection
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
const switchDatabase = async (req: Request, res: Response, next: NextFunction) => {
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
  // The Express app is exported so that it can be used by serverless Functions.
async function createExpressApp(): Promise<express.Express> {
  const app = express();
  const __filename = fileURLToPath(import.meta.url);
  const serverDistFolder = __filename;
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(browserDistFolder, 'index.server.html');

  const compression = (await import('compression')).default;
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(switchDatabase);

  // API Routes
  app.use("/api/authorize", apiLimiter, authorizeRoute);
  app.use("/api/accountManagement", accountManagementRoute);
  app.use("/api/skalars", skalarsRoute);
  app.use("/api/canada", canadianRoute);

  // Serve static files
  app.get('*.*', express.static(browserDistFolder, {
      maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  app.get('*', (req: Request, res: Response) => {
      const { protocol, originalUrl, baseUrl, headers } = req;
      const commonEngine = new CommonEngine();

      commonEngine.render({
          bootstrap,
          documentFilePath: indexHtml,
          url: `${protocol}://${headers.host}${originalUrl}`,
          publicPath: browserDistFolder,
          providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then(html => res.send(html))
      .catch(err => {
          console.error('Error occurred in server side rendering:', err);
          res.status(500).send('Server error');
      });
  });

  return app;
}
// Run server
async function run() {
  const port = process.env['PORT'] || 4200;
  const app = createExpressApp();

  (await app).listen(port, () => {
      console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();