// This file is created by egg-ts-helper@1.25.7
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportTokenHandler from '../../../app/middleware/token_handler';

declare module 'egg' {
  interface IMiddleware {
    tokenHandler: typeof ExportTokenHandler;
  }
}
