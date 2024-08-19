import { Service } from '../core/service';
import { v4 as uuidv4 } from 'uuid';

export default class CommentService extends Service {
  async queryComment(page = 1, size = 10) {
    return await this.ctx.model.Comment.findAndCountAll({
      order: [[ 'id', 'DESC' ]],
      offset: (page - 1) * size,
      limit: size,
    });
  }
  async delComment(id: string) {
    const aComment = await this.ctx.model.Comment.findByPk(id);
    if (!aComment) {
      return false;
    }
    await aComment.destroy();
    return true;
  }

  async addComment(body) {
    const id = uuidv4();
    return await this.ctx.model.Comment.create({ ...body, id });
  }

  async updateComment(body) {
    if (!body.id) {
      return -1;
    }
    const aComment = await this.ctx.model.Comment.findByPk(body.id);
    if (!aComment) {
      return -2;
    }

    return await aComment.update(body);
  }

  async getCommentById(id: string) {
    if (!id) {
      return -1;
    }
    const aComment = await this.ctx.model.Comment.findByPk(id);

    return await aComment;
  }

}
