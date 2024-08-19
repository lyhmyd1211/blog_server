import { Application } from 'egg';

export default (app: Application) => {
  app.beforeStart(async () => {
    await app.model.sync({ alter: true });// force  false 为不覆盖 true会删除再创建; alter true可以 添加或删除字段;
  });
  const { controller, router, jwt } = app;
  const { home, article, types, upload, search, location } = controller;
  router.get('/', home.index);
  router.get('/admin', home.admin);
  router.get('/api/logout', home.logout);

  const localStrategy = app.passport.authenticate('local', { successRedirect: '/api/loginCallback', failureRedirect: '/api/loginFailCallback' });
  router.post('/api/login', localStrategy);
  // router.post('/passport/local', home.localPassport);
  router.get('/api/loginCallback', home.loginCallback);
  router.get('/api/loginFailCallback', home.loginFailCallback);
  router.get('/api/currentUser', jwt, home.getCurrentUser);

  router.get('/api/getArticleList', article.getArticleList);
  router.get('/api/delArticle', jwt, article.delArticle);
  router.post('/api/addArticle', jwt, article.addArticle);
  router.post('/api/editArticle', jwt, article.editArticle);
  router.get('/api/getArticleById', article.getArticleById);
  router.get('/api/getAllTime', article.getAllTime);
  router.get('/api/getMonth', article.getMonth);


  router.get('/api/getArticleTypeList', jwt, types.getArticleTypeList);
  router.get('/api/delArticleType', jwt, types.delArticleType);
  router.post('/api/addArticleType', jwt, types.addArticleType);
  router.post('/api/editArticleType', jwt, types.editArticleType);
  router.get('/api/getArticleTypeById', jwt, types.getArticleTypeById);

  router.get('/api/hasCode', jwt, types.hasCode);
  router.get('/api/getTypeIdByCode', jwt, types.getIdByCode);
  router.post('/api/upload', jwt, upload.upload);

  router.get('/api/search', search.index);

  router.get('/api/getLocationInfo', location.getLocationInfo);
};
