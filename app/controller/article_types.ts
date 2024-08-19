import { Controller } from 'egg';

export default class ArticleTypesController extends Controller {
  async addArticleType() {
    const { ctx } = this;
    const body = ctx.request.body;
    const res = await ctx.service.articleType.addArticleType(body);
    if (res) {
      ctx.body = {
        data: null,
        code: 0,
        msg: '添加成功',
      };
    }
  }
}
