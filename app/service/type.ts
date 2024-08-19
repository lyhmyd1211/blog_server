import { Service } from '../core/service';
import { v4 as uuidv4 } from 'uuid';

export default class ArticleService extends Service {
  async queryArticleType(page = 1, size = 10) {
    return await this.ctx.model.Type.findAndCountAll({
      order: [[ 'id', 'DESC' ]],
      offset: (page - 1) * size,
      limit: size,
    });
  }
  async delArticleType(id: string) {
    const atype = await this.ctx.model.Type.findByPk(id);
    if (!atype) {
      return false;
    }
    await atype.destroy();
    return true;
  }

  async addArticleType(body) {
    const id = uuidv4();
    return await this.ctx.model.Type.create({ ...body, id });
  }

  async updateArticleType(body) {
    if (!body.id) {
      return -1;
    }
    const atype = await this.ctx.model.Type.findByPk(body.id);
    if (!atype) {
      return -2;
    }

    return await atype.update(body);
  }

  async getArticleTypeById(id: string) {
    if (!id) {
      return -1;
    }
    const atype = await this.ctx.model.Type.findByPk(id);

    return await atype;
  }

  async getHasCode(code: string, id?: string) {
    const { Op } = this.app.Sequelize;
    return await this.ctx.model.Type.findAndCountAll({
      where: {
        code,
        id: {
          [Op.ne]: id,
        },
      },
    });
  }

  async getIdByCode(code: string[]|string) {
    const { Op } = this.app.Sequelize;
    return await this.ctx.model.Type.findAll({
      where: {
        code: {
          [Op.in]: code,
        },
      },
      attributes: [ 'id' ],
    });
  }
}
