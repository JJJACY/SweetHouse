// 引用基础模型
const Base = require('./base.js');

// 定义用户模型并基础基础模型
class Address extends Base {
  // 定义参数默认值为 address 分类管理表
  constructor(props = 'address') {
    super(props);
  }
}

module.exports = new Address()