process.env['DEBUG'] = '*::INFO, *::WARN, *::ERR, *::SEVERE, *::';
process.env['DEBUG_COLORS'] = 'true';
process.env['DEBUG_STREAM'] = 'stdout';

import * as debugsx from 'debug-sx';
import * as path from 'path';
import { Server } from './server';

const date = new Date();
export const log: debugsx.IFullLogger = debugsx.createFullLogger('main');
const consolelogger: debugsx.IHandler = debugsx.createConsoleHandler('stdout', '*::INFO, *::FINE, *::SEVERE, *::ERR, *::WARN', '-*', [
  { level: 'INFO', color: 'cyan', inverse: true },
  { level: 'FINE', color: 'white', inverse: true },
  { level: 'SEVERE', color: 'red', inverse: true },
  { level: 'ERR', color: 'red', inverse: true },
  { level: 'WARN', color: 'magenta', inverse: true }
]);
let filelogger: debugsx.IHandler;

filelogger = debugsx.createFileHandler(
  path.join(
    __dirname,
    '..',
    'log',
    'server_' + date.toLocaleDateString() + '_' + date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds() + '.log'
  ),
  '*::INFO, *::FINE, *::SEVERE, *::ERR, *::WARN',
  '-*',
  [
    { level: 'INFO', color: 'cyan', inverse: true },
    { level: 'FINE', color: 'white', inverse: true },
    { level: 'SEVERE', color: 'red', inverse: true },
    { level: 'ERR', color: 'red', inverse: true },
    { level: 'WARN', color: 'magenta', inverse: true }
  ]
);

debugsx.addHandler(consolelogger, filelogger);

const port = 88;

class Main {
  constructor() {}

  public async init() {
    Server.Instance.start(port).catch(err => {
      log.severe(err);
      process.exit();
    });
  }
}

async function main() {
  const m = new Main();
  await m.init();
}

main();
