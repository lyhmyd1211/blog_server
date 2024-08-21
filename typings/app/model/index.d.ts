// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportArticle from '../../../app/model/article';
import ExportArticleComment from '../../../app/model/article_comment';
import ExportArticleType from '../../../app/model/article_type';
import ExportComment from '../../../app/model/comment';
import ExportType from '../../../app/model/type';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Article: ReturnType<typeof ExportArticle>;
    ArticleComment: ReturnType<typeof ExportArticleComment>;
    ArticleType: ReturnType<typeof ExportArticleType>;
    Comment: ReturnType<typeof ExportComment>;
    Type: ReturnType<typeof ExportType>;
    User: ReturnType<typeof ExportUser>;
  }
}
