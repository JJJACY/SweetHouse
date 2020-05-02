const classifyModels = require('../models/classify.js');
const productModels = require('../models/product.js');

const wxclassifyControllers ={
  allClassify: async function(req,res,next){
    try{
      let classifyData = await classifyModels.all();
      res.json({
        code:200,
        data:classifyData
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:"服务器错误"
      })
    }
  },
  singleGoods: async function(req,res,next){
    let id = req.params.id;
    try{
      let single = await productModels.where({classify_id:id})
      console.log(single)
      res.json({
        code:200,
        data: single
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:"服务器错误"
      })

    }
  }

}
module.exports = wxclassifyControllers