import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.proxy = true;
  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0', // 不建议设置 hostname 为 '0.0.0.0'，它将允许来自外部网络和来源的连接，请在知晓风险的情况下使用
      // path: '/var/run/egg.sock',
    },
  };
  config.sequelize = {
    dialect: 'mysql',
    host: 'mysql',
    port: 3306,
    database: 'blog',
    username: 'root',
    password: 'FLRmysql!@!!1211',
    timezone: '+08:00',
  };

  config.elasticsearch = {
    host: 'es:9200',
    apiVersion: '7.x',
  };
  return config;
};
