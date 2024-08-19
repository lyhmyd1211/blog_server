// app.js
const LocalStrategy = require('passport-local').Strategy;

module.exports = app => {
  // 挂载 strategy
  app.passport.use(new LocalStrategy({
  // 将请求信息传递到callback界面
    passReqToCallback: true,
  // 中间件会自动从username和passport字段读取用户名和密码，如果需要更改：
  // usernameField: 'email',
  // passwordField: 'passwd'
  }, (req, username, password, done) => {
    // format user
    const user = {
      provider: 'local',
      username,
      password,
    };
    app.passport.doVerify(req, user, done);
  }));

  // 处理用户信息
  app.passport.verify(async (ctx, user) => {
    // 鉴权核心代码
    // 利用之前创建的user对象，查库，可以用service，也可以用Sequelize
    // 获得一些用户信息
    const { username, password } = user;
    const res = await ctx.service.login.queryUser(username, password);
    if (res.length > 0) {
      return res;
    }
    return false;


  });
  app.passport.serializeUser(async (_ctx, user) => {
    // 序列化user信息
    return user;
  });
  app.passport.deserializeUser(async (_ctx, user) => {
    // 反序列化user信息
    return user;
  });
};
