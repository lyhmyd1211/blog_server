import { Service } from '../core/service';
import { v4 as uuidv4 } from 'uuid';
export default class ArticleService extends Service {
  includeType = [
    {
      model: this.ctx.model.Type,
      attributes: [[ 'text', 'label' ], [ 'code', 'value' ]],
      through: { attributes: [] }, // 排除中间表
    },
  ];
  async queryArticle(page = 1, size = 10, type?: string) {
    const { Article } = this.ctx.model;
    const where = type ? { where: { code: type } } : {};
    return await Article.findAndCountAll({
      order: [[ 'create_time', 'DESC' ]],
      offset: (page - 1) * size,
      limit: size,
      include: [{ ...this.includeType[0], ...where }],
      raw: false,
      distinct: true, // 不计算联表查询的数量
    });
  }
  async delArticle(id: string) {
    const article = await this.ctx.model.Article.findByPk(id);
    if (!article) {
      return false;
    }
    await article.destroy();
    return true;
  }

  async addArticle(body) {
    const id = uuidv4();
    const { Op } = this.app.Sequelize;
    // 事务处理 数据插入关联表
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      const articleData = await this.ctx.model.Article.create({ ...body, id, viewTimes: 0 }, { transaction });
      const typeData = await this.ctx.model.Type.findAll({
        where: {
          code: {
            [Op.in]: body.type.split(','),
          },
        },
        attributes: [ 'id' ],
      }, { transaction });
      const param: {id: string; typeId: string; articleId: string}[] = [];
      typeData.map(item => {
        param.push({
          id: uuidv4(),
          typeId: item.dataValues.id,
          articleId: articleData.dataValues.id,
        });
        return item;
      });
      await this.ctx.model.ArticleType.bulkCreate(param, { transaction });
      await transaction.commit();
      return articleData;
    } catch (error) {
      await transaction.rollback();
      return null;
    }

  }

  async updateArticle(body) {
    const { Op } = this.app.Sequelize;
    if (!body.id) {
      return -1;
    }
    const atype = await this.ctx.model.Article.findByPk(body.id);
    if (!atype) {
      return -2;
    }
    // 事务处理 数据插入关联表
    let transaction;
    try {
      transaction = await this.ctx.model.transaction();
      const articleData = await atype.update(body, { transaction });
      const typeData = await this.ctx.model.Type.findAll({
        where: {
          code: {
            [Op.in]: body.type.split(','),
          },
        },
        attributes: [ 'id' ],
      }, { transaction });
      const param: {id: string; typeId: string; articleId: string}[] = [];
      const typeArea: string[] = [];
      typeData.map(item => {
        typeArea.push(item.dataValues.id);
        param.push({
          id: uuidv4(),
          typeId: item.dataValues.id,
          articleId: articleData.dataValues.id,
        });
        return item;
      });
      await this.ctx.model.ArticleType.destroy({
        where: {
          articleId: articleData.dataValues.id,
        },
      }, { transaction });
      await this.ctx.model.ArticleType.bulkCreate(param, { transaction });
      await transaction.commit();
      return articleData;
    } catch (error) {
      await transaction.rollback();
      return null;
    }

  }

  async getArticleById(id) {
    if (!id) {
      return -1;
    }
    const transaction = await this.ctx.model.transaction();
    try {
      const atype = await this.ctx.model.Article.findOne({
        where: {
          id,
        },
        include: this.includeType,
        raw: false,
      }, { transaction });
      await atype.increment('view_times', { silent: true, transaction }); // 字段加1  silent不更新updatetime字段
      await transaction.commit();
      return await atype;

    } catch (error) {
      await transaction.rollback();
      return null;
    }


  }

  // todo 聚合查询groupby  date_format格式化函数
  async getAllTime() {
    const { Article } = this.ctx.model;
    return await Article.findAll({
      attributes: [
        [ this.app.Sequelize.fn('date_format', this.app.Sequelize.col('create_time'), '%Y-%m-%d'), 'create_time' ],
        [ this.app.Sequelize.fn('COUNT', this.app.Sequelize.fn('date_format', this.app.Sequelize.col('create_time'), '%Y-%m-%d')), 'count' ],
      ],
      group: this.app.Sequelize.fn('date_format', this.app.Sequelize.col('create_time'), '%Y-%m-%d'),
      raw: true });
  }

  async getMonth() {
    const { Article } = this.ctx.model;
    return await Article.findAll({
      order: [[ 'create_time', 'DESC' ]],
      attributes: [
        [ this.app.Sequelize.fn('date_format', this.app.Sequelize.col('create_time'), '%d日'), 'day' ],
        [ this.app.Sequelize.fn('date_format', this.app.Sequelize.col('create_time'), '%Y年%m月'), 'month' ],
        [ this.app.Sequelize.fn('date_format', this.app.Sequelize.col('create_time'), '%H:%i:%S'), 'time' ],
        'title',
        'id',
      ],
      raw: true });
  }
}
