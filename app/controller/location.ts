import { Controller } from 'egg';

export default class LocationController extends Controller {

  async getLocationInfo() {
    const { ctx } = this;
    const key = '0171f8ce065d7865f81b8c29860c4158';
    const nameUrl = `https://restapi.amap.com/v5/ip?key=${key}&type=4&ip=${ctx.request.ip}`;
    const cityName = await ctx.curl(nameUrl, { dataType: 'json' });
    const codeUrl = `https://restapi.amap.com/v3/config/district?key=${key}&keywords=${cityName.data.city}`;
    const cityCode = await ctx.curl(codeUrl, { dataType: 'json' });
    if (cityCode.data.districts.length > 0) {
      const weatherUrl = `https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${cityCode.data.districts[0].adcode}`;
      const live = await ctx.curl(weatherUrl, { dataType: 'json' });
      ctx.body = {
        data: live.data,
        code: 0,
        msg: '查询成功',
      };
    }
  }
}
