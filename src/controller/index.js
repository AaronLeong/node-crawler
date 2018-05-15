const Base = require('./base.js');
module.exports = class extends Base {
  async indexAction() {
    const data  =  await think.mongo('user').select();
    console.log(data)
    return this.display();
  }
};
