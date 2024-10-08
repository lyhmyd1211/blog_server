// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportArticle from '../../../app/service/article';
import ExportArticleType from '../../../app/service/article_type';
import ExportComment from '../../../app/service/comment';
import ExportLogin from '../../../app/service/login';
import ExportType from '../../../app/service/type';

declare module 'egg' {
  interface IService {
    article: AutoInstanceType<typeof ExportArticle>;
    articleType: AutoInstanceType<typeof ExportArticleType>;
    comment: AutoInstanceType<typeof ExportComment>;
    login: AutoInstanceType<typeof ExportLogin>;
    type: AutoInstanceType<typeof ExportType>;
  }
}
