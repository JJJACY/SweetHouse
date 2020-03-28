const bannerModels = require('../models/banner');

const bannerControllers ={
  insert: async function(req,res,next){
    let image_url =req.body.image_url;
    let page_url = req.body.page_url;
    if(!image_url || !page_url){
      res.json({
        code: 0,
        message:'缺少参数'
      })
    }try{
      await bannerModels.insert({image_url ,page_url})
      res.json({
        code:200,
        message: '新增成功'
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message:'服务器错误'
      })
    }
  },
  all: async function(req,res,next){
    try{
      let data = await bannerModels.all();
      res.json({
        code: 200,
        data: data
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message:'服务器错误'
      })
    }
  },
  delete: async function(req,res,next){
    let id = req.params.id;
    try{
      await bannerModels.delete(id)
      res.json({
        code: 200,
        message: '删除成功'
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
module.exports = bannerControllers;