const bannerModels = require('../models/banner');
const classifyModels = require('../models/classify.js');

const wxindexControllers ={
  allBanner: async function(req,res,next){
    try{
      let banner = await bannerModels.all();
      res.json({
        code: 200,
        data: banner
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message:'服务器错误'
      })
    }
  },
  allClassify: async function(req,res,next){
    try{
      let classify = await classifyModels.all();
        res.json({
          code: 200,
          data: classify
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
module.exports = wxindexControllers