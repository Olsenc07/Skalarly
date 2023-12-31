import * as express from 'express';
import { CommonEngine } from '@angular/ssr';
import { APP_BASE_HREF } from '@angular/common';
import { Request, Response } from 'express';
import { AppServerModule } from './../skalarly-frontend/src/app/app.server.module'; // Adjust the path as needed

const app = express();
const PORT = process.env['PORT'] || 4000;

export async function renderAngularUniversal(req: Request, res: Response) {
  const commonEngine = new CommonEngine();
  const options = {
    req,
    documentFilePath: '',
    publicPath: 'dist/browser',
    providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
  };

  try {
    const html = await commonEngine.render({
      bootstrap: AppServerModule,
      documentFilePath: options.documentFilePath,
      url: req.url,
      publicPath: 'dist/browser', 
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
    res.send(html);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Set the view engine and directory for views
app.set('view engine', 'html');
app.set('views', 'dist/browser'); 

app.use(express.static('dist/browser'));
app.get('*', renderAngularUniversal);

// Start the server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
