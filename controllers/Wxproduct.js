const productModels = require('../models/product.js');
const skusModels = require('../models/skus.js');

const wxproductControllers ={
  all: async function(req,res,next){
    try{
      let productData = await productModels.all();
      res.json({
        code: 200,
        data:productData
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message:'服务器错误'
      })
    }
  },
  singleProduct: async function(req,res,next){
    let id = req.params.id;
    try{
      let productArr = await productModels.single(id);
      let products = productArr[0];
      products.banner = JSON.parse(products.banner)
      let skus = await skusModels.where({product_id:id})
      res.json({
        code: 200,
        data: {
          goods: products,
          sku: skus
        }
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message:'服务器错误'
      })
    }
  }
}
module.exports = wxproductControllers