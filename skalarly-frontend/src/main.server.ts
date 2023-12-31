import * as express from 'express';
const app = express();
const PORT = process.env['PORT'] || 4000;
import { renderAngularUniversal } from '../server';

app.set('view engine', 'html');
app.set('views', 'dist/browser'); 

app.use(express.static('dist/browser'));
app.get('*', renderAngularUniversal);

// Start the server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
