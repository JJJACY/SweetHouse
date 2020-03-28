const skusModels = require('../models/skus.js');

const skusControllers ={
  insert: async function(req,res,next){
    let price = req.body.price;
    let number = req.body.number;
    let stock = req.body.stock;
    let image_url = req.body.image_url;
    if(!price || !number || !stock || !image_url){
      res.json({
        code: 0,
        message: '缺少参数'
      })
    }try{
      await skusModels.insert({price,number,stock,image_url})
      res.json({
        code: 200,
        message:'新增成功'
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message:'服务器错误'
      })
    }
  },
  update:async function(req,res,next){
    let id = req.params.id;
    let price = req.body.price;
    let number = req.body.number;
    let stock = req.body.stock;
    let image_url = req.body.image_url;
    if(!price || !number || !stock || !image_url){
      res.json({
        code: 0,
        message: '缺少参数'
      })
    }try{
      await skusModels.update(id,{price,number,stock,image_url})
      res.json({
        code: 200,
        message:'修改成功'
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message:'服务器错误'
      })
    }
  },
  delete:async function(req,res,next){
    let id = req.params.id;
    try{
      await skusModels.delete(id)
      res.json({
        code: 200,
        message:'删除成功'
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
module.exports = skusControllers