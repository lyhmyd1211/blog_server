// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportArticle from '../../../app/controller/article';
import ExportArticleTypes from '../../../app/controller/article_types';
import ExportHome from '../../../app/controller/home';
import ExportLocation from '../../../app/controller/location';
import ExportSearch from '../../../app/controller/search';
import ExportTypes from '../../../app/controller/types';
import ExportUpload from '../../../app/controller/upload';

declare module 'egg' {
  interface IController {
    article: ExportArticle;
    articleTypes: ExportArticleTypes;
    home: ExportHome;
    location: ExportLocation;
    search: ExportSearch;
    types: ExportTypes;
    upload: ExportUpload;
  }
}
