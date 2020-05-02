const addressModels = require('../models/address.js');
const userModels = require('../models/user.js');

const WxaddressControllers={
  insert: async function(req,res,next){
    let user_id = req.body.user_id;
    let located = req.body.located;
    let phone = req.body.phone;
    let descript = req.body.descript;
    let selected = req.body.default;
    let name = req.body.name;
    try{
      if(selected){
        await addressModels.all().update({default:false})
      }
      await addressModels.insert({user_id,name,located,phone,descript,default:selected})
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
  single: async function(req,res,next){
    let id = req.params.id;
    try{
      const single = await addressModels.where({user_id:id})
      .leftJoin('user','address.user_id','user.id')
      .column("*",{id:'address.id'})
      res.json({
        code: 200,
        data: single
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message:'服务器错误'
      })
    }
  },
  default: async function(req,res,next){
    let id = req.params.id;
    try{
      const data = await addressModels.where({user_id: id,default: 1})
      res.json({
        code: 200,
        data: data
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 200,
        message: '服务器错误'
      })
    }
  },
  update: async function(req,res,next){
    let id = req.params.id;
    try{
      await addressModels.all().update(id,{default:false})
      await addressModels.single(id).update({default: true})
      res.json({
        code: 200,
        message: '修改成功'
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 200,
        message: '服务器错误'
      })
    }
  },
  delete: async function(req,res,next){
    let id = req.params.id;
    try{
      await addressModels.delete(id)
      res.json({
        code: 200,
        message: '删除成功'
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 200,
        message: '服务器错误'
      })
    }
  },
}
module.exports = WxaddressControllers;