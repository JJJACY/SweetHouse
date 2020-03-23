const cartModel = require('../models/cart.js')

const cartControllers = {
  all: async function(req,res,next){
    try{
      let cart = await cartModel.all()
      res.json({
        code: 200,
        data: cart
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message: '服务器错误'
      })
    }
  },
  insert:async function(req,res,next){
    // let user_id = req.params.user_id;
    // let skus_id = req.params.skus.id;
    try{
      let user_id = await cartModel.where({'cart.id':id})
      .leftJoin('user','cart.user_id','user.id')
      .column('*',{'id':'cart.id'})
      let skus_id = await cartModel.where({'cart.id':id})
      .leftJoin('skus','cart.skus_id','skus.id')
      .column('*',{'id':'cart.id'})
      await cartModel.insert({user_id,skus_id})
      res.json({
        code: 200,
        message: '新增成功'
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message: '服务器错误'
      })
    }
  },
  delete: async function(req,res,next){
    let id = req.params.id;
    try{
      await cartModel.delete(id)
      res.json({
        code: 200,
        message:'删除成功'
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message: '服务器错误'
      })
    }
  }
}
module.exports = cartControllers