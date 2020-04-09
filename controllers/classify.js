const classifyModels = require('../models/classify.js');

const classifyControllers={
  all: async function(req,res,next){
    try{
      const all = await classifyModels.all()
      res.json({
        code:200,
        data: all
      })
      console.log(all,123)
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message:'服务器错误'
      })
    }
  },
  insert: async function(req,res,next){
    let name = req.body.name;
    if(!name){
      res.json({
        code: 0,
        message:'缺少参数'
      })
    }try{
      await classifyModels.insert({name})
      res.json({
        code: 200,
        message:'增加成功'
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message:'服务器错误'
      })
    }
  },
  update: async function(req,res,next){
    let id = req.params.id;
    let name = req.body.name;
    if(!id || !name){
      res.json({
        code:0,
        message:'服务器错误'
      })
    }try{
      await classifyModels.update(id,{name})
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
  delete: async function(req,res,next){
    let id = req.params.id;
    try{
      await classifyModels.delete(id)
      res.json({
        code:200,
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
module.exports = classifyControllers;