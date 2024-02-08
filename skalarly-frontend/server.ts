import 'zone.js';
import * as express from 'express';
import * as compression from 'compression';
import * as dotenv from 'dotenv';
dotenv.config();
import { CommonEngine } from '@angular/ssr';
import { APP_BASE_HREF } from '@angular/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { AppServerPromise } from 'src/main.server';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
app.use(compression());
const PORT = process.env['PORT'] || 4200;
const DIST_FOLDER = join(process.cwd(), 'dist/skalarly-frontend/');
console.log('port1', PORT);
app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

const API_BASE_URL = process.env['BACKEND_API_URL'];
console.log('API_BASE_URL', API_BASE_URL);
const apiProxyOptions = {
  target: API_BASE_URL,
  changeOrigin: true,
  followRedirects: true,
  onError: (err: Error, req: Request, res: Response) => {
    console.error('Proxy encountered an error:', err);
    if (!res.headersSent) {
      res.status(502).json({ error: 'Error occurred while proxying to the API.' });
    } else {
      res.end();
    }
  }
};
app.use(express.static(DIST_FOLDER));
app.use('/api/*', (req, res, next) => {
  console.log('API Request Received:', req.baseUrl, req.url);
  next();
});
app.use('/api', createProxyMiddleware(apiProxyOptions));
app.get('*', async (req: Request, res: Response) => {
  try {
    const commonEngine = new CommonEngine();
    const options = {
      documentFilePath: join(DIST_FOLDER, 'index.html'),
      url: req.url,
      publicPath: DIST_FOLDER,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]
    };

    const html = await commonEngine.render({
      bootstrap: AppServerPromise, 
      ...options
    });

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
