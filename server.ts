import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import 'localstorage-polyfill';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

global['localStorage'] = localStorage;
// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {  
  const server = express();
  setProxy(server);
  let distFolder = join(process.cwd(), "browser");
  if (!existsSync(distFolder)) {
    distFolder = join(process.cwd(), "dist/yavin-web/browser");
  }
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });
  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

function setProxy(server: express.Express): void {
  require("dotenv-json-complex")();
  
  server.use('/api/ookbee/account', createProxyMiddleware({ target: process.env.SVC_OOKBEE_ACCOUNT, changeOrigin: true, pathRewrite: { '^/api/ookbee/account': '' } }));
  server.use('/api/yavin/user', createProxyMiddleware({ target: process.env.SVC_YAVIN_USER, changeOrigin: true, pathRewrite: { '^/api/yavin/user': '' } }));
  server.use('/api/yavin/account', createProxyMiddleware({ target: process.env.SVC_YAVIN_ACCOUNT, changeOrigin: true, pathRewrite: { '^/api/yavin/account': '' } }));
  server.use('/api/yavin/agreement', createProxyMiddleware({ target: process.env.SVC_YAVIN_AGREEMENT, changeOrigin: true, pathRewrite: { '^/api/yavin/agreement': '' } }));
  server.use('/api/yavin/post', createProxyMiddleware({ target: process.env.SVC_YAVIN_POST, changeOrigin: true, pathRewrite: { '^/api/yavin/post': '' } }));
  server.use('/api/yavin/page', createProxyMiddleware({ target: process.env.SVC_YAVIN_PAGE, changeOrigin: true, pathRewrite: { '^/api/yavin/page': '' } }));
  server.use('/api/yavin/group', createProxyMiddleware({ target: process.env.SVC_YAVIN_GROUP, changeOrigin: true, pathRewrite: { '^/api/yavin/group': '' } }));

}

export * from './src/main.server';
