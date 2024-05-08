import 'zone.js';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import rateLimit from 'express-rate-limit';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// static files
const browserDistFolder = join(__dirname, '../browser');
// SSR entry
const bootstrapPath = join(__dirname, '../server/main.server.mjs');
const indexHtml = join(__dirname, 'index.server.html');

// DB connection URIs from env variables
// const db_auth = process.env['MONGODB_AUTH'] || '';
// const db_content = process.env['MONGODB_CONTENT'] || '';
const isProduction = process.env['NODE_ENV'] === 'production';

// Rate limiting middleware
// const apiLimiter = rateLimit({
//     windowMs: 5 * 60 * 1000, // 5 minutes
//     max: 7, // limit each IP to 7 requests per windowMs
//     handler: (req, res, next) => {
//       res.status(429).json({
//           error: 'Too many requests, please try again after 5 minutes'
//       });
//   }
//   });
// Initialize mongoose connections
let mongooseAuth: mongoose.Connection, mongooseContent: mongoose.Connection;

//  Responsive DataBase connection
// const connectAuthDB = async () => {
//   if (!mongooseAuth || mongooseAuth.readyState === 0) {
//     try {
//       mongooseAuth = mongoose.createConnection(db_auth);
//       console.log('Connected to Auth database!');
//     } catch (error) {
//       console.error('MongoDB Auth connection error:', error);
//     }
//   }
// };

// const connectContentDB = async () => {
//   if (!mongooseContent || mongooseContent.readyState === 0) {
//     try {
//       mongooseContent = mongoose.createConnection(db_content);
//       console.log('Connected to Content database!');
//     } catch (error) {
//       console.error('MongoDB Content connection error:', error);
//     }
//   }
// };

// Middleware to switch databases
// const switchDatabase = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//     if (req.path.startsWith('/')  || req.path.startsWith('/sign-up') || req.path.startsWith('/login')) {
//        await connectAuthDB();
//     } else {
//        await connectContentDB();
//        if (mongooseAuth.readyState === 1) { 
//         try {
//           await mongooseAuth.close();
//           console.log('Disconnected from Auth database!');
//         } catch (closeError) {
//           console.error('Error closing Auth DB connection:', closeError);
//         }
//       }
//     }
//     next();
//   } catch (error) {
//     console.error('Error in switchDatabase:', error);
//     next(error); 
//   }
//   };
  // The Express app is exported so that it can be used by serverless Functions.
async function createServer(): Promise<express.Express> {
  const server = express();
  server.use(cors())

     // Middleware
     server.use(compression());

     server.use(express.json());
     server.use(express.urlencoded({ extended: true }));
      
    server.set('view engine', 'html');
    server.set('views', browserDistFolder);
  // Serve static files
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: isProduction ? '1y' : '0', 
    etag: isProduction, 
    setHeaders: (res, path) => {
        if (isProduction) {
            if (path.endsWith('index.html')) {
                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            }
        }
    }
}));
  // server.use(switchDatabase);


// fix routes
     // Backend routes
  
// API Routes
// const accountManagementRoutePath = join(__filename, '../..backend/routes/account-management.js');
// const authorizeRoutePath = join(__filename, '../../backend/routes/authorize.js');
// const skalarsRoutePath = join(__filename, '../..backend/routes/skalars.js');
// const canadianRoutePath = join(__filename, '../../backend/routes/canadian-schools.js');

//   const accountManagementRoute = (await import(accountManagementRoutePath)).default;
//   const authorizeRoute = (await import(authorizeRoutePath)).default;
//   const skalarsRoute = (await import(skalarsRoutePath)).default;
//   const canadianRoute = (await import(canadianRoutePath)).default;
 
  // API Routes
  // server.use("/api/authorize", authorizeRoute);
  // server.use("/api/accountManagement", accountManagementRoute);
  // server.use("/api/skalars", skalarsRoute);
  // server.use("/api/canada", canadianRoute);

 // All regular routes use the Angular engine
 server.get('*', async (req: Request, res: Response) => {
  try {
  const { protocol, originalUrl, baseUrl, headers } = req;
  const commonEngine = new CommonEngine();
  const { default: bootstrap } = await import(bootstrapPath);
  commonEngine.render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
  })
  .then(html => res.send(html))
  .catch(err => {
      console.error('Error occurred in server side engine:', err);
      res.status(500).send('Server error');
  });
} catch (error) {
  console.error('Error occurred in server side rendering:', error);
  res.status(500).send('Server error');
}
});
return server;
}

async function startServer() {
  const port = process.env['PORT'] || 4200;
  const server = createServer();
  (await server).listen(port, () => {
      console.log(`Node Express server listening`);
  });
}

startServer().catch(err => {
  console.error('Uncaught error in startServer:', err);
});