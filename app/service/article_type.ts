import { Service } from '../core/service';
import { v4 as uuidv4 } from 'uuid';

export default class ArticleTypeService extends Service {

  async addArticleType(body) {
    const id = uuidv4();
    return await this.ctx.model.ArticleType.create({ ...body, id });
  }

  async updateArticleType(body) {
    if (!body.id) {
      return -1;
    }
    const atype = await this.ctx.model.ArticleType.findByPk(body.id);
    if (!atype) {
      return -2;
    }

    return await atype.update(body);
  }

}
