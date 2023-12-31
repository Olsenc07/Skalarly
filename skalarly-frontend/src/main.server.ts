import * as express from 'express';
import { join } from 'path';
import { CommonEngine } from '@angular/ssr';
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent }from './app/app.component';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  imports: [
    ServerModule
  ],
  bootstrap: [AppComponent], // Bootstrap standalone component
})
class AppServerModule {}

const app = express();
const PORT = process.env['PORT'] || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/skalarly-frontend');
const templatePath = join(DIST_FOLDER, 'index.html');

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

app.get('*', (req, res, next) => {
  const commonEngine = new CommonEngine();
  commonEngine.render({
    bootstrap: AppServerModule,
    url: req.url,
    documentFilePath: templatePath, // Use the path, not the content
    providers: [
      { provide: APP_BASE_HREF, useValue: req.baseUrl }
    ]
  })
  .then(html => res.send(html))
  .catch(err => next(err));
});

app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
