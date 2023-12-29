// SERVER NODE.JS Using ES6 module
// dev
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
const portEnv = process.env.PORT;
const db = process.env.mongodb;
import express from 'express';
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
const port = portEnv || 4200;

//  DataBase connection
mongoose.connect(db) 
.then(()  => {
  console.log('Connected to database!')})
.catch((error) => {
  console.error('MongoDB connection error:', error);
})
// App Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (
    req.get("x-forwarded-proto") !== "https"
    &&
  process.env.NODE_ENV !== "development"
  ) {
    return res.redirect("https://" + req.get("host") + req.url);
  }
  next();
}

// CORS
app.use((req, res, next) => {
    res.setHeader( "Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type: 'multipart/form-data', Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
 });

// API routes
app.use("/api/authorize", authorizeRoute);
app.use("/api/accountManagement", accountManagementRoute);
app.use("/api/skalars", skalarsRoute);
app.use("/api/canada", canadianRoute);

// Production
// Serve Angular Application - this assumes 'ng build' outputs to 'dist/skalarly-frontend'
const angularAppPath = join(__dirname, 'dist', 'skalarly-frontend');
app.use(express.static(angularAppPath));
app.get('*',requireHTTPS, (req, res) => {
  res.sendFile(join(angularAppPath, 'index.html'));
});

// Server Activation
app.listen(port, () => {
  console.log(`Listening to requests on ${port}`);
})

export default app