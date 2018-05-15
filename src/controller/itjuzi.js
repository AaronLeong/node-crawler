'use strict';

import Base from './base.js';

const charset = require('superagent-charset');
const superagent = charset(require('superagent'));
// const superagent = charset(require('superagent'));

// let skuIdList = [];
let cookie = '';
const keyword = 'IT桔子';

export default class extends Base {
  async companylistAction() {
    let text;
    let pageNum = 0;
    let pageTotal = 5179;
    let stopPage = 0;
    const page = 1;
    const _this = this;

    console.log(keyword, page);
    for (let pageIndex = 1; pageIndex <= page; pageIndex++) {
      const url = 'http://radar.itjuzi.com/company/infonew?page=' + pageIndex;

      console.log('loading sku id list...', url);
      const result = await superagent.get(url)
        .charset('utf-8')
        .set('Accept', 'application/json, text/javascript, */*; q=0.01')
        .set('Accept-Encoding', 'gzip, deflate')
        .set('Accept-Language', 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7,la;q=0.6')
        .set('Connection', 'keep-alive')
        .set('Content-Type', 'application/json')
        .set('Cookie', 'acw_tc=AQAAAGshIF5+SQkAgBRVtAc/OfhcZix7; session=155f09703c3a3786ff877d7326ca4f53ecd28900; _ga=GA1.2.736923528.1526300023; _gid=GA1.2.634053336.1526300023; Hm_lvt_1c587ad486cdb6b962e94fc2002edf89=1526300024; gr_user_id=d7d0936e-8a7d-4d6d-a8c7-113060e51c59; gr_session_id_eee5a46c52000d401f969f4535bdaa78=f117e8f4-0581-4c9a-a682-712cca9bf39b_true; identity=626786864@qq.com; remember_code=gomCYuIuWw; unique_token=34734; user-radar.itjuzi.com={"n":"AARON","v":0}; Hm_lvt_80ec13defd46fe15d2c2dcf90450d14b=1526300028; MEIQIA_EXTRA_TRACK_ID=14ayTXwycB1BZ9zGVG8QpTfIZcA; Hm_lpvt_80ec13defd46fe15d2c2dcf90450d14b=1526300086; Hm_lpvt_1c587ad486cdb6b962e94fc2002edf89=1526300092')
        .set('Host', 'radar.itjuzi.com')
        .set('Referer', 'http://radar.itjuzi.com/company')
        .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36')
        .set('X-Requested-With', 'XMLHttpRequest');

      if (result.status === 200) {
        cookie = result.header['set-cookie']; // 从response中得到cookie
        // console.log(cookie)
        text = eval('(' + result.text + ')');
        // text = decodeUnicode(res.text);
        // text = 'http:%/%/cdn.itjuzi.com%/images%/ad93971d493851e6b5e8f14d26f0f2eb.png'.replace("\%","");
        // console.log(text)
        // console.log(text.substring(850,856) )
        // text = JSON.parse(text)
        // console.log(text)
        pageNum = text.data.page_num + 1;
        pageTotal = text.data.page_total;
        if (text.status === 1) {
          if (text.data.rows.lenght > 0) {

          }
        } else {
          if (stopPage !== 0) {
            stopPage = pageNum;
          }
          console.log('err stopPage:', stopPage);
        }
      }
      // console.log('res:', res);
      const model = this.mongo('company');
      const res = await model.addMany(text.data.rows);

      console.log('res:', res);

      // console.log(text.data.rows[0]);
      // console.log(text.data.page_total);
      console.log('successfully!', 'pageIndex:', pageIndex);
      // console.log()
    }

    // console.log('over')
    // think.http("/home/getcomments/start", true);
    // console.log('start getComments...')

    return this.success();
  }
}

// function decodeUnicode(str) {
//   str = str.replace(/(^\s*)|(\s*$)/g, '');
//   str = str.replace(/\\/g, '%');
//   return unescape(str);
// }
