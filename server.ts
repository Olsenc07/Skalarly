import 'zone.js';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import compression from 'compression';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import helmet, { HelmetOptions } from 'helmet';
import rateLimit from 'express-rate-limit';

const isProduction = process.env['NODE_ENV'] === 'production';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// static files
const browserDistFolder = join(__dirname, '../browser');
// SSR entry
const bootstrapPath = join(__dirname, '../server/main.server.mjs');
const indexHtml = join(__dirname, 'index.server.html');

// Backend Paths
const accountManagementRoutePath = join(__dirname, '../backend/routes/account-management.js');
const authorizeRoutePath = join(__dirname, '../backend/routes/authorize.js');
const skalarsRoutePath = join(__dirname, '../backend/routes/skalars.js');
const canadianRoutePath = join(__dirname, '../backend/routes/canadian-schools.js');

// fix dist backend routes backend ...

// DB connection URIs from env variables
// const db_auth = process.env['MONGODB_AUTH'] || '';
// const db_content = process.env['MONGODB_CONTENT'] || '';
// console.log('hi', db_auth);
// console.log(db_content);

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
// let mongooseAuth: mongoose.Connection, mongooseContent: mongoose.Connection;

//  Responsive DataBase connection
// const connectAuthDB = async () => {
//   if (!mongooseAuth || mongooseAuth.readyState === 0) {
//     try {
//       mongooseAuth = mongoose.createConnection(db_auth);
//       console.log('Connected to Auth database!');
//     } catch (error) {
//       // console.error('MongoDB Auth connection error:', error);
//     }
//   }
// };

// const connectContentDB = async () => {
//   if (!mongooseContent || mongooseContent.readyState === 0) {
//     try {
//       mongooseContent = mongoose.createConnection(db_content);
//       console.log('Connected to Content database!');
//     } catch (error) {
//       console.error('MongoDB Content connection error:');
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
//           // console.error('Error closing Auth DB connection:', closeError);
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
  const helmetOptions: HelmetOptions = isProduction ? {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"], 
            scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "https://www.google.com", "https://www.gstatic.com"],
            styleSrc: ["'self'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:", "https://www.skalarly.com", "https://cdn.jsdelivr.net", "https://www.gstatic.com", 'blob:'], 
            connectSrc: ["'self'", "https://www.google.com"], 
            fontSrc: ["'self'", "https:", "data:", "https://fonts.gstatic.com"], 
            objectSrc: ["'none'"], 
            scriptSrcAttr: ["'none'"]
          }   
    },
    frameguard: {
        action: 'sameorigin'
    },
    hidePoweredBy: true,
    dnsPrefetchControl: {
        allow: false
    },
    noSniff: true
} : {
    contentSecurityPolicy: false, // Disable CSP in development to allow all headers
    frameguard: {
        action: 'sameorigin'
    },
    hidePoweredBy: true,
    dnsPrefetchControl: {
        allow: true
    },
    noSniff: false
};
  const server = express();

  // server.use(helmet(helmetOptions));

  const corsOptions = isProduction ? {
    origin: 'https://www.skalarly.com',
    optionsSuccessStatus: 200
} : {
    origin: '*',
    optionsSuccessStatus: 200
};
  server.use(cors(corsOptions))

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
 // Backend routes
  const accountManagementRoute = (await import(accountManagementRoutePath)).default;
  const authorizeRoute = (await import(authorizeRoutePath)).default;
  const skalarsRoute = (await import(skalarsRoutePath)).default;
  const canadianRoute = (await import(canadianRoutePath)).default;
 
  // API Routes
  server.use("/api/authorize", authorizeRoute);
  server.use("/api/accountManagement", accountManagementRoute);
  server.use("/api/skalars", skalarsRoute);
  server.use("/api/canada", canadianRoute);

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