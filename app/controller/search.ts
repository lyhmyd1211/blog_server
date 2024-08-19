

const Controller = require('egg').Controller;
class SearchController extends Controller {
  // 在增加商品的时候，需要把数据同步到es，搜索的时候接入es, 这样搜索会更快
  // 下面的news索引是之前建好的，可以结合elasticsearch-heard来测试
  async index() {
    // 测试的时候，逐个代码展开测试 如下：

    // 增加数据
    // await this.add();

    // 修改数据
    // await this.edit();

    // 搜索数据
    // await this.query();

    // 分页搜索数据
    await this.pager();

    // 统计数据
    // await this.count();

    // 删除数据
    // await this.delete();
  }

  // 是否是时间格式
  strDateTime = str => {
    const reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    const r = str.match(reg);
    if (r == null) return false;
    const d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);
    // eslint-disable-next-line eqeqeq
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4] && d.getHours() == r[5] && d.getMinutes() == r[6] && d.getSeconds() == r[7]);
  };


  async pager() {
    const { page, size, search } = this.ctx.query;
    const ik = await this.app.elasticsearch.indices.analyze({
      body: {
        analyzer: 'ik_max_word',
        text: [ search ],
      },
    });
    const searchArr = ik.tokens.map(item => {
      return item.token;
    }).join(' ');

    // if (this.strDateTime(searchArr)) {
    //   searchArr = searchArr.split(' ').join('T');
    // }
    const searchBody = search ? {
      query: {
        bool: {
          should: [
            {
              multi_match: {
                query: searchArr,
                type: 'cross_fields',
                fields: [ 'title^2', 'abstract' ],
              },
            },
          ],
        },
      },
      highlight: {
        fields: {
          title: {},
          abstract: {},
        },
      },
    } : {

      sort: [{ update_time: { order: 'desc', unmapped_type: 'date' } }],


    };
    const result = await this.app.elasticsearch.search({
      index: 'blog',
      from: (page - 1) * size, // skip
      size,
      body: {
        ...searchBody,
      },
    });

    let dealData = result.hits.hits.map((item: { highlight: { [x: string]: any[] }; _source: any }) => {
      if (item.highlight) {
        Object.keys(item.highlight).map(el => {
          if (item.highlight[el] && item.highlight[el].length > 0) {
            item.highlight[el] = item.highlight[el][0];
          }
          return el;
        });
        return { ...item._source, ...item.highlight };
      }
      return item._source;
    });
    dealData = dealData.map(item => {
      item.createTime = item.create_time;
      item.updateTime = item.update_time;
      item.viewTimes = item.view_times;
      item.titlePic = item.title_pic;
      delete item.create_time;
      delete item.update_time;
      delete item.view_times;
      delete item.title_pic;
      return item;
    });
    this.ctx.body = {
      code: 0,
      msg: '查询成功',
      data: dealData,
    };
  }


}

module.exports = SearchController;
