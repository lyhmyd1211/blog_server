import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  static: {
    enable: true,
  },
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  passportLocal: {
    enable: true,
    package: 'egg-passport-local',
  },
  passportGithub: {
    enable: true,
    package: 'egg-passport-github',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  elasticsearch: {
    enable: true,
    package: 'egg-es',
  },
};

export default plugin;
