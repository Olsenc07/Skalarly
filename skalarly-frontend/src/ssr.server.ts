import { bootstrapApplication, provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { join } from 'path';
import { readFileSync } from 'fs';
import { renderModule } from '@angular/platform-server';
import { APP_BASE_HREF } from '@angular/common';
import * as express from 'express';

const server = express();
const distFolder = join(process.cwd(), 'dist/skalarly-frontend');
const indexHtml = readFileSync(join(distFolder, 'index.html'), 'utf8').toString();

const bootstrap = () => bootstrapApplication(AppComponent, {
    providers: [
      provideClientHydration(withHttpTransferCacheOptions({
        includePostRequests: true
      })),
      { provide: APP_BASE_HREF, useValue: '/' }
    ]
  });

server.get('*', (req, res, next) => {
    const { protocol, url, baseUrl, headers } = req;
    renderModule(AppComponent, {
        document: indexHtml,
        url: url
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  // Server static files from /dist
server.get('*.*', express.static(distFolder, {
    maxAge: '1y',
  }));

    // Start  Node server
const PORT = process.env['PORT'] || 4200;
server.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});

export default bootstrap;
