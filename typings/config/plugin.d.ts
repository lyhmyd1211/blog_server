// This file is created by egg-ts-helper@1.35.1
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import 'egg-onerror';
import 'egg-session';
import 'egg-i18n';
import 'egg-watcher';
import 'egg-multipart';
import 'egg-security';
import 'egg-development';
import 'egg-logrotator';
import 'egg-schedule';
import 'egg-static';
import 'egg-jsonp';
import 'egg-view';
import 'egg-mysql';
import 'egg-cors';
import 'egg-sequelize';
import 'egg-passport';
import 'egg-passport-local';
import 'egg-passport-github';
import 'egg-jwt';
import 'egg-es';
import { EggPluginItem } from 'egg';
declare module 'egg' {
  interface EggPlugin {
    onerror?: EggPluginItem;
    session?: EggPluginItem;
    i18n?: EggPluginItem;
    watcher?: EggPluginItem;
    multipart?: EggPluginItem;
    security?: EggPluginItem;
    development?: EggPluginItem;
    logrotator?: EggPluginItem;
    schedule?: EggPluginItem;
    static?: EggPluginItem;
    jsonp?: EggPluginItem;
    view?: EggPluginItem;
    mysql?: EggPluginItem;
    cors?: EggPluginItem;
    sequelize?: EggPluginItem;
    passport?: EggPluginItem;
    passportLocal?: EggPluginItem;
    passportGithub?: EggPluginItem;
    jwt?: EggPluginItem;
    elasticsearch?: EggPluginItem;
  }
}