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
console.log('imported', canadianRoute);
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
import '@angular/compiler'; // dev
import { CommonEngine } from '@angular/ssr';
import { APP_BASE_HREF } from '@angular/common';
import { AppServerPromise } from './dist/skalarly-frontend/server/main.js'

// Serve static files and SSR
const PORT = process.env.PORT || 4200;
const DIST_FOLDER = join(__dirname, './dist/skalarly-frontend/browser');
app.set('view engine', 'html');
app.set('views', DIST_FOLDER);
app.use(express.static(DIST_FOLDER, { index: false }));

app.get('*', async (req, res) => {
    try {
      const commonEngine = new CommonEngine();
      const options = {
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
        url: req.url,
        publicPath: DIST_FOLDER,
        document: `DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">  
          <title>Skalarly - Log In</title>
          <link rel="icon" type="image/png" href="/assets/images/Skalar_Hat_Icon.svg">
          <base href="/">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@300" />
          <meta name="description" content="Join Skalarly to enhance your academic journey. 
          Stay informed with updates about your school and connect with a global community of academics.
           Showcase your field of study and engage in enriching academic exchanges.">
          <meta property="og:title" content="Skalarly">
          <meta property="og:description" content="Join Skalarly to enhance your academic journey. Stay informed and connect with academics globally.">
          <meta property="og:image" content="https://www.skalarly.com/assets/images/Skalar_Hat_Icon.svg">
          <meta property="og:url" content="https://www.skalarly.com">
        </head>
          <body>
              <!-- Hidden SVG sprite definitions -->
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg" style="display: none;"
               viewBox="0 0 1420.000000 1127.000000"
              preserveAspectRatio="xMidYMid meet">
            <symbol id="skalarly-icon" viewBox="0 0 1420 1127">   
             <g transform="translate(0.000000,1127.000000) scale(0.100000,-0.100000)"
             fill="#000000" stroke="none">
             <path d="M8139 11207 c-101 -94 -203 -182 -258 -223 -32 -24 -70 -59 -85 -78
             -14 -20 -68 -69 -119 -109 -50 -41 -141 -123 -202 -181 -60 -59 -137 -128
             -170 -154 -33 -25 -107 -91 -164 -145 -58 -54 -116 -106 -130 -115 -14 -9 -89
             -77 -167 -152 -78 -74 -154 -142 -170 -150 -16 -8 -73 -56 -126 -107 -53 -51
             -101 -93 -107 -93 -5 0 -87 -75 -183 -166 -95 -91 -194 -178 -220 -193 -26
             -15 -111 -88 -189 -162 -77 -74 -148 -138 -157 -143 -10 -5 -68 -58 -130 -118
             -62 -60 -136 -124 -165 -142 -28 -19 -63 -46 -77 -61 -24 -26 -94 -88 -220
             -194 -92 -78 -110 -100 -110 -137 0 -19 -9 -50 -19 -70 -11 -21 -22 -68 -26
             -112 -4 -43 -13 -87 -21 -99 -9 -14 -14 -51 -14 -103 0 -49 -5 -92 -14 -108
             -7 -15 -17 -61 -21 -102 -4 -41 -13 -90 -21 -109 -8 -18 -14 -63 -14 -100 0
             -47 -6 -77 -20 -104 -13 -24 -20 -56 -20 -91 0 -29 -9 -82 -20 -116 -11 -36
             -20 -91 -20 -129 -1 -42 -6 -73 -15 -85 -10 -14 -15 -44 -15 -96 0 -55 -5 -86
             -19 -114 -12 -22 -23 -71 -27 -119 -3 -45 -13 -94 -20 -109 -8 -15 -14 -55
             -14 -90 0 -44 -6 -75 -20 -101 -15 -27 -20 -56 -20 -112 0 -45 -6 -87 -14
             -103 -8 -15 -17 -63 -21 -107 -4 -44 -13 -90 -21 -102 -8 -13 -14 -48 -14 -83
             0 -38 -7 -80 -19 -108 -11 -26 -22 -85 -26 -132 -3 -47 -12 -103 -20 -125 -8
             -22 -14 -62 -15 -88 0 -26 -6 -60 -14 -75 -8 -15 -17 -70 -21 -122 -4 -52 -13
             -105 -21 -117 -8 -13 -14 -49 -14 -89 0 -47 -5 -76 -19 -98 -12 -20 -21 -60
             -25 -111 -3 -44 -13 -98 -21 -120 -8 -22 -14 -68 -15 -101 0 -40 -7 -78 -21
             -109 -17 -37 -20 -61 -16 -101 4 -40 1 -61 -14 -89 -15 -28 -20 -58 -21 -118
             -1 -60 -6 -92 -20 -117 -14 -27 -17 -46 -12 -86 5 -41 2 -59 -15 -92 -15 -29
             -21 -60 -21 -107 0 -79 -50 -215 -90 -247 -70 -55 -315 -188 -430 -234 -25
             -10 -57 -26 -72 -36 -15 -10 -63 -36 -108 -58 -44 -22 -102 -55 -128 -73 -26
             -19 -72 -44 -102 -56 -79 -33 -406 -198 -464 -235 -52 -32 -121 -68 -486 -253
             -121 -61 -235 -121 -253 -131 -30 -19 -219 -120 -481 -258 -124 -66 -163 -95
             -191 -147 -9 -18 -44 -52 -77 -77 -60 -45 -211 -195 -328 -325 -106 -118 -341
             -364 -415 -434 -187 -176 -432 -438 -437 -467 -3 -18 3 -19 78 -16 45 1 104 7
             130 12 70 15 224 41 259 44 17 2 77 7 134 11 57 4 120 14 140 23 20 8 74 16
             121 18 47 2 121 8 165 13 44 6 109 13 145 17 36 3 76 10 90 15 14 5 79 14 145
             19 66 6 149 15 185 20 36 6 101 14 145 19 44 5 98 14 120 20 22 6 73 11 113
             11 40 0 81 4 91 10 10 5 83 11 162 14 92 3 162 10 193 20 39 13 79 15 184 11
             73 -2 138 -8 144 -11 6 -4 72 -11 147 -15 76 -4 155 -15 179 -23 31 -11 55
             -13 80 -8 21 5 50 5 65 1 16 -4 173 -10 350 -14 231 -4 333 -10 362 -20 26 -9
             108 -15 235 -18 107 -3 208 -10 223 -16 15 -6 103 -16 195 -22 96 -6 181 -17
             201 -25 18 -8 45 -14 60 -14 15 0 51 -7 81 -15 52 -15 83 -21 270 -60 41 -8
             95 -22 120 -29 25 -8 74 -17 110 -20 75 -7 216 -43 245 -63 11 -7 38 -13 61
             -13 22 0 67 -9 99 -20 32 -11 75 -20 95 -20 21 0 66 -9 100 -20 34 -11 72 -20
             84 -20 11 0 41 -6 66 -14 25 -7 72 -17 105 -21 33 -4 72 -13 87 -21 15 -8 49
             -14 75 -14 26 -1 73 -9 103 -20 30 -11 69 -20 85 -20 17 0 44 -8 60 -17 17 -9
             66 -19 110 -23 44 -4 109 -15 145 -23 36 -8 92 -18 125 -22 33 -4 92 -18 130
             -31 39 -12 98 -25 131 -29 34 -4 74 -13 89 -21 14 -7 57 -16 93 -19 37 -4 108
             -15 157 -25 115 -24 197 -40 260 -50 28 -5 70 -16 95 -24 24 -9 50 -14 58 -11
             15 6 129 -11 179 -26 27 -8 143 -31 239 -46 37 -6 152 30 242 76 34 17 69 31
             78 31 8 0 47 16 85 35 39 19 79 35 90 35 11 0 46 13 79 30 32 16 90 41 127 55
             37 14 88 36 113 49 25 13 68 31 95 39 28 8 81 31 120 51 38 20 77 36 86 36 9
             0 47 15 85 34 38 19 83 38 99 42 17 4 62 22 102 40 39 19 80 34 91 34 11 0 53
             15 93 33 41 19 99 42 129 51 30 10 69 24 86 32 17 7 80 30 140 50 60 20 114
             40 119 44 6 4 21 11 35 15 14 4 58 23 98 41 41 19 81 34 89 34 9 0 40 11 69
             25 29 14 76 31 106 39 48 13 102 34 214 87 22 10 50 19 61 19 11 0 45 13 76
             30 31 16 68 30 82 30 15 0 58 14 98 31 40 18 90 35 112 39 59 12 236 75 291
             104 27 14 53 26 57 26 5 0 54 20 111 44 56 24 126 49 154 55 29 6 79 24 112
             41 33 16 65 30 72 30 7 0 38 16 68 35 36 23 66 35 90 35 42 0 143 50 410 204
             102 58 192 106 201 106 9 0 46 20 83 45 36 25 94 59 129 76 34 17 85 43 112
             58 28 15 68 37 90 49 22 12 46 22 54 22 7 0 36 16 62 35 27 19 60 35 74 35 17
             0 39 14 64 39 21 21 57 51 80 65 48 31 52 50 14 70 -37 18 -167 44 -268 52
             -44 4 -95 13 -114 20 -21 9 -72 14 -135 14 -56 0 -117 5 -136 11 -54 16 -240
             42 -289 40 -24 -1 -64 6 -87 15 -24 9 -51 14 -60 10 -9 -3 -36 3 -61 14 -37
             16 -67 20 -155 20 -77 0 -119 5 -146 16 -20 9 -68 22 -107 29 -38 7 -116 23
             -173 34 -57 12 -118 21 -136 21 -20 0 -57 15 -99 40 -36 22 -92 47 -124 55
             -32 8 -83 28 -113 44 -94 49 -153 78 -215 107 -71 32 -216 104 -230 114 -5 4
             -28 13 -50 20 -33 10 -200 93 -315 156 -14 8 -30 14 -37 14 -7 0 -89 38 -184
             85 -94 47 -177 85 -185 85 -8 0 -43 15 -77 34 -130 71 -223 116 -240 116 -14
             0 -101 43 -297 147 -14 7 -32 13 -41 13 -24 0 -272 126 -291 147 -9 10 -37 92
             -62 183 -26 91 -51 173 -56 182 -6 10 -10 26 -10 35 0 16 -42 160 -69 238 -6
             17 -22 73 -36 125 -33 127 -56 201 -66 223 -9 16 -42 142 -58 217 -4 19 -13
             45 -20 58 -7 13 -18 45 -26 70 -7 26 -24 88 -38 137 -14 50 -34 117 -45 150
             -11 33 -23 78 -27 100 -4 22 -31 114 -60 205 -29 91 -58 185 -64 210 -6 25
             -18 68 -27 95 -8 28 -24 82 -34 120 -33 121 -48 168 -75 245 -14 41 -30 95
             -36 120 -5 25 -21 81 -35 125 -15 44 -33 107 -40 140 -15 73 -35 137 -69 230
             -14 39 -34 104 -44 145 -29 113 -48 177 -55 188 -3 5 -12 38 -20 73 -18 76
             -35 135 -75 249 -16 47 -32 103 -36 125 -3 22 -21 85 -40 140 -18 55 -40 134
             -49 175 -9 41 -25 95 -35 120 -10 25 -24 65 -30 90 -7 25 -18 68 -27 95 -22
             77 -11 117 52 186 30 32 54 63 54 68 0 6 18 31 40 56 22 26 49 63 59 83 10 21
             29 46 41 57 26 24 90 118 90 133 0 5 23 29 50 52 28 23 50 48 50 55 0 7 20 37
             45 66 25 29 54 72 65 95 11 23 30 50 41 60 12 11 30 36 40 56 11 21 44 63 74
             93 45 45 62 55 89 55 18 0 51 7 72 16 21 9 79 20 128 24 50 5 116 13 146 19
             30 5 169 10 308 10 200 1 257 4 275 15 17 11 108 17 424 25 221 6 437 16 480
             22 43 6 115 10 161 9 61 0 82 3 82 12 0 13 -607 322 -750 383 -86 37 -267 125
             -842 409 -262 130 -487 240 -500 246 -12 5 -30 14 -38 19 -21 12 -96 46 -150
             67 -63 24 -222 97 -265 122 -11 6 -82 41 -157 77 -75 36 -142 73 -148 81 -9 9
             -32 14 -74 14 -58 0 -63 -3 -107 -43z"/>
             </g>
            </symbol>
          </svg>
          <app-root></app-root>
          </body>
        </html>`
,        
        documentFilePath: join(DIST_FOLDER, 'index.html'),
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
