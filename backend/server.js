// SERVER NODE.JS Using ES6 module
import express from 'express';
import bodyParser from 'body-parser';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
// Browser Push Notifications
import webpush from 'web-push';
// MongoDB
import mongoose from 'mongoose';
// Routes
import accountManagementRoute from './routes/account-management.js';
import authorizeRoute from './routes/authorize.js';
import skalarsRoute from './routes/skalars.js';
// Constructing __dirname 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// App Variables
// Express
const app = express();
const server = https.createServer(
//   {
//   key: fs.readFileSync('path/to/private.key'),
//   cert: fs.readFileSync('path/to/certificate.crt')
// }, 
app);
const port = process.env.PORT || 4200;


//  DataBase connection
mongoose.connect(process.env.mongodb)
.then(()  => {
    console.log('Connected to database!');
})
.catch(() => {
    console.log('Not connected to database');
});

// Server Activation
server.listen(port, () => {
    console.log(`Listening to requests on ${port}`);
  })

// App Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('build'));
app.use('/account-management', express.static('/skalarly-fs/backend/routes/account-management.js'));
app.use('/authorize', express.static('/skalarly-fs/backend/routes/authorize.js'));
app.use('/skalars', express.static('/skalarly-fs/backend/routes/skalars.js'));

// Static files
const angularAppPath = join(__dirname, '/Users/chaseolsen/skalarly-MVP/skalarly-fs/skalarly-frontend/src/app');
app.use(express.static(angularAppPath));

// CORS
app.use((req, res, next) => {
    res.setHeader( "Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type: 'multipart/form-data', Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
 });
app.use("/api/authorize", authorizeRoute);
app.use("/api/accountManagement", accountManagementRoute);
app.use("/api/skalars", skalarsRoute);

// Secured ReRouting
function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (
      (req.get("x-forwarded-proto") !== "https")
      &&
    (process.env.NODE_ENV !== "development")
    ) {
      return res.redirect("https://" + req.get("host") + req.url);
    }
    next();
  }

// Serve the static Angular files from the 'dist' directory when build
// app.use(express.static('/app/../static'));

// Catch-all route to serve the Angular app
app.get("*", requireHTTPS, (req, res) => {
  res.status(200).sendFile(join(angularAppPath, 'index.html'));   
})
// PWA 
app.get("/worker.js", (req, res) => {
  res.status(200).sendFile(join(angularAppPath, 'worker.js'));
  });

export default app