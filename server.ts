import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';

export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Serve static files from /browser
  server.get('.', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All other routes send index.html for Angular to handle
  server.get('*', (req, res) => {
    res.sendFile(join(browserDistFolder, 'index.html'));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
