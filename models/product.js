// 引用基础模型
const Base = require('./base.js');

// 定义用户模型并基础基础模型
class Product extends Base {
  // 定义参数默认值为 product 分类管理表
  constructor(props = 'product') {
    super(props);
  }
}

module.exports = new Product()