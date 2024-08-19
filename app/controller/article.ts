import { Controller } from 'egg';

export default class ArticleController extends Controller {
  async getArticleList() {
    const { ctx } = this;
    const { page, size, type } = ctx.query;
    const tmp = await ctx.service.article.queryArticle(page ? parseInt(page) : 1, size ? parseInt(size) : 10, type);
    ctx.body = {
      data: tmp.rows.map(item => item),
      total: tmp.count,
      code: 0,
    };
  }

  async delArticle() {
    const { ctx } = this;
    const { id } = ctx.query;
    const res = await ctx.service.article.delArticle(id);
    if (res) {
      ctx.body = {
        data: null,
        code: 0,
        msg: '删除成功',
      };
    } else {
      ctx.body = {
        data: null,
        code: -1,
        msg: '删除失败',
      };
    }
  }

  async addArticle() {
    const { ctx } = this;
    const body = ctx.request.body;
    const res = await ctx.service.article.addArticle(body);
    if (res) {
      ctx.body = {
        data: res,
        code: 0,
        msg: '添加成功',
      };
    } else {
      ctx.body = {
        data: res,
        code: 1,
        msg: '添加失败',
      };
    }

  }

  async editArticle() {
    const { ctx } = this;
    const body = ctx.request.body;
    const res = await ctx.service.article.updateArticle(body);
    if (res === -1) {
      ctx.body = {
        data: null,
        code: -1,
        msg: 'id不能为空',
      };
    } else if (res === -2) {
      ctx.body = {
        data: null,
        code: -1,
        msg: '编辑失败',
      };
    } else
    if (res) {
      ctx.body = {
        data: null,
        code: 0,
        msg: '编辑成功',
      };
    }
  }

  async getArticleById() {
    const { ctx } = this;
    const { id } = ctx.query;
    const tmp = await ctx.service.article.getArticleById(id);
    ctx.body = {
      data: tmp,
      code: 0,
    };
  }

  async getAllTime() {
    const { ctx } = this;
    const tmp = await ctx.service.article.getAllTime();
    const day = {};
    tmp.map((item: { create_time: string | number; count: any }) => {
      day[item.create_time] = item.count;
      return item;
    });
    ctx.body = {
      data: day,
      code: 0,
    };
  }

  async getMonth() {
    const { ctx } = this;
    const tmp = await ctx.service.article.getMonth();
    const month = {};
    tmp.map((item: { month: string | number }) => {
      if (month[item.month]) {
        month[item.month].push(item);
      } else {
        month[item.month] = [ item ];
      }
      return item;
    });
    ctx.body = {
      data: month,
      code: 0,
    };
  }
}
