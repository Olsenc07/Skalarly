import 'zone.js';
import * as express from 'express';
import { CommonEngine } from '@angular/ssr';
import { APP_BASE_HREF } from '@angular/common';
import { Request, Response } from 'express';
import { join } from 'path';
import { AppServerPromise } from 'src/main.server';

const app = express();
const PORT = process.env['PORT'] || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/skalarly-frontend/');

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);
app.use(express.static(DIST_FOLDER));

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
