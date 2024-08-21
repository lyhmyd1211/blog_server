// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportTokenHandler from '../../../app/middleware/token_handler';

declare module 'egg' {
  interface IMiddleware {
    tokenHandler: typeof ExportTokenHandler;
  }
}
