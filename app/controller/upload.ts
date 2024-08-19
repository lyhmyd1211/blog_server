import fs = require('fs');
import path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
import sendToWormhole = require('stream-wormhole');
import dayjs = require('dayjs');
import { Controller } from 'egg';
export default class UploadController extends Controller {


  async upload() {
    const stream = await this.ctx.getFileStream();
    const bashFileName = 'uploads';
    // 基础的目录
    const uplaodBasePath = 'app/public/' + bashFileName;
    // 生成文件名
    const filename = `${Date.now()}${
      parseInt(Math.random() * 1000 + '')
    }${path.extname(stream.filename).toLocaleLowerCase()}`;
    // 生成文件夹
    const dirname = dayjs(Date.now()).format('YYYY/MM/DD');
    function mkdirsSync(dirname) {
      if (fs.existsSync(dirname)) {
        return true;
      }
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }

    }
    mkdirsSync(path.join(uplaodBasePath, dirname));
    // 生成写入路径
    const target = path.join(uplaodBasePath, dirname, filename);
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
    // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
      const viewPath = path.join(this.ctx.host, bashFileName, dirname, filename);
      this.ctx.body = {
        data: { filePath: this.ctx.protocol + '://' + viewPath.replace(/\\/g, '/') },
        code: 0,
      };
    } catch (err) {
    // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      this.ctx.body = {
        error: '400',
        data: null,
        code: 0,
      };
    }

  }

}
