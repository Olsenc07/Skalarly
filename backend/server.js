// SERVER NODE.JS
import express from 'express';
const bodyParser = require('body-parser');
import https from 'http';

// App Variables
// Express
const app = express();
const routes = require('/app/backend/api');
app.use('/api', routes)
const server = https.createServer(app)
const port = process.env.PORT || 4200;

// MongoDB
const mongoose = require('mongoose');
//  DataBase connection
mongoose.connect(process.env.mongodb)
.then(()  => {
    console.log('Connected to database!');
})
.catch(() => {
    console.log('Not connected to database');
});

// Browser Push Notifications
const webpush = require('web-push');

// Routes
const accountManagementRoute = require('/app/backend/routes/account-management');
const authorizeRoute = require('/app/backend/routes/authorize');
const skalarsRoute = require('/app/backend/routes/skalars');


// Server Activation
server.listen(port, () => {
    console.log(`Listening to requests on ${port}`);
  })

// App Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('build'));
app.use('/account-management', express.static('/app/backend/account-management'));
app.use('/authorize', express.static('/app/backend/authorize'));
app.use('/skalars', express.static('/app/backend/skalars'));

// CORS
app.use((req, res, next) => {
    res.setHeader( "Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type: 'multipart/form-data', Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
    next();
 });
app.use("/api/authorize", authorizeRoute);
app.use("/api/account-management", accountManagementRoute);
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
app.get("/", requireHTTPS, (req, res) => {
    res.status(200).sendFile('/app/skalarly-frontend/src/app');   
})
app.get('*', requireHTTPS, (req, res) => {
  res.sendFile('/app/skalarly-frontend/static/index.html');
});
// PWA 
app.get("/worker.js", (req, res) => {
    res.sendFile('/app/skalarly-frontend/src/worker.js');
  });




export default app