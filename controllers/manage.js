const manageModels = require('../models/manage.js');

const manageControllers = {
  all: async function(req,res,next){
    try{
        const all = manageModels.all()
        res.json({
          code: 200,
          data: all
        })
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message:'服务器错误'
      })
    }
  },
  single: async function(req,res,next){
    let id = req.prarms.id;
    try{
      let singles = await manageModels.single(id)
      let single = singles[0]
      res.json({
        code: 200,
        data:single
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message:'服务器错误'
      })
    }
  },
  insert: async function(req,res,next){
    let phone = req.body.phone;
    let name = req.body.name;
    let password = req.body.password;
    let status = 1;
    if(!phone || !name || !password){
      res.json({
        code:0,
        message:'缺少参数'
      })
    }try{
      await manageModels.insert({phone,name,password,status})
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
    let phone = req.body.phone;
    let name = req.body.name;
    let password = req.body.password;
    if(!id || !phone || !name|| !password){
      res.json({
        code: 0,
        message:'缺少参数'
      })
    }try{
      await manageModels.update(id,{phone,name,password})
      res.json({
        code: 200,
        message: '修改成功'
      })

    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message:' 服务器错误'
      })
    }
  },
  delete: async function(req,res,next){
    let id = req.params.id;
    try{
      await manageModels.delete(id)
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
module.exports = manageControllers;