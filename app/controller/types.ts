import { Controller } from 'egg';

export default class TypeController extends Controller {
  async getArticleTypeList() {
    const { ctx } = this;
    const { page, size } = ctx.query;
    const tmp = await ctx.service.type.queryArticleType(page ? parseInt(page) : 1, size ? parseInt(size) : 10);
    ctx.body = {
      data: tmp.rows.map(item => item),
      total: tmp.count,
      code: 0,
    };
  }

  async delArticleType() {
    const { ctx } = this;
    const { id } = ctx.query;
    const res = await ctx.service.type.delArticleType(id);
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

  async addArticleType() {
    const { ctx } = this;
    const body = ctx.request.body;
    const res = await ctx.service.type.addArticleType(body);
    if (res) {
      ctx.body = {
        data: null,
        code: 0,
        msg: '添加成功',
      };
    }
  }

  async editArticleType() {
    const { ctx } = this;
    const body = ctx.request.body;
    const res = await ctx.service.type.updateArticleType(body);
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

  async getArticleTypeById() {
    const { ctx } = this;
    const { id } = ctx.query;
    const tmp = await ctx.service.type.getArticleTypeById(id);
    if (tmp === -1) {
      ctx.body = {
        data: null,
        msg: '查询失败',
        code: 0,
      };
    } else {
      ctx.body = {
        data: tmp,
        code: 0,
      };
    }

  }

  async hasCode() {
    const { ctx } = this;
    const { code, id } = ctx.query;
    const { count } = await ctx.service.type.getHasCode(code, id);
    if (count > 0) {
      ctx.body = {
        data: 1,
        msg: 'code已存在',
        code: 0,
      };
    } else {
      ctx.body = {
        data: 0,
        msg: 'code不存在',
        code: 0,
      };
    }
  }

  async getIdByCode() {
    const { ctx } = this;
    const { code } = ctx.query;
    const res = await ctx.service.type.getIdByCode(code);
    if (res) {
      ctx.body = {
        data: res,
        msg: '查询成功',
        code: 0,
      };
    } else {
      ctx.body = {
        data: res,
        msg: '查询失败',
        code: 1,
      };
    }

  }

}
