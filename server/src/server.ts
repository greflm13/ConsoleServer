import * as express from 'express';
import * as path from 'path';
import * as bodyparser from 'body-parser';
import * as http from 'http';
import * as child from 'child_process';

import { log } from './main';

export class Server {
  private static _instance: Server;

  public static get Instance(): Server {
    if (Server._instance === undefined) {
      Server._instance = new Server();
    }
    return Server._instance;
  }

  _express = express();

  private constructor() {
    this._express.use(bodyparser.json());
    this._express.use(bodyparser.urlencoded({ extended: true }));
    this._express.use(this.logger);

    this._express.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
    this._express.use(express.static(path.join(__dirname, '../../ngx/dist')));
    this._express.post('/api/command', (req: express.Request, res: express.Response, next: express.NextFunction) =>
      this.console(req, res, next)
    );
    this._express.get('/api/path', (req: express.Request, res: express.Response, next: express.NextFunction) => this.path(req, res, next));
    this._express.use((req, res, next) => this.error404Handler(req, res, next));
    this._express.use((err: express.Errback, req: express.Request, res: express.Response, next: express.NextFunction) =>
      this.errorHandler(err, req, res, next)
    );
  }

  public console(req: express.Request, res: express.Response, next: express.NextFunction) {
    const pat = path.dirname(__dirname);
    child.exec(req.body.command, (error, stdout, stderr) => {
      if (stdout !== '') {
        log.info(stdout);
        res.send(JSON.stringify(pat + ': ' + stdout));
      }
      if (stderr !== '') {
        log.warn(stderr);
        res.send(JSON.stringify(pat + ': ' + stderr));
      }
    });
  }

  public path(req: express.Request, res: express.Response, next: express.NextFunction) {
    const pat = path.dirname(__dirname);

    res.send(JSON.stringify(pat));
  }

  public error404Handler(req: express.Request, res: express.Response, next: express.NextFunction) {
    const clientSocket = req.socket.remoteAddress + ':' + req.socket.remotePort;
    log.warn('Error 404 for %s %s from %s', req.method, req.url, clientSocket);
    res.status(404).sendFile(path.join(__dirname, 'views/error404.html'));
  }

  public errorHandler(err: express.Errback, req: express.Request, res: express.Response, next: express.NextFunction) {
    const ts = new Date().toLocaleString();
    log.warn('Error %s\n%e', ts, err);
  }

  public logger(req: express.Request, res: express.Response, next: express.NextFunction) {
    const clientSocket = req.socket.remoteAddress + ':' + req.socket.remotePort;
    log.info(req.method, req.url, clientSocket);
    next();
  }

  public start(port: number): Promise<Server> {
    return new Promise<Server>((resolve, reject) => {
      const server = http.createServer(this._express).listen(port, () => {
        log.info('Server running on port ' + port);
        server.on('close', () => {
          log.fine('Server stopped.');
        });
        server.on('err', err => {
          log.warn(err);
        });
      });
    });
  }
}
