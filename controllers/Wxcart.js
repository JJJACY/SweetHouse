const cartModel = require('../models/cart');
const skusModels = require('../models/skus');

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
  single: async function(req,res,next){
    let id = req.params.id;
    console.log(id,111)
    try{
      const cartData = await cartModel.where({'cart.user_id':id}) 
      .leftJoin('skus','cart.skus_id','skus.id')
      .column({'id':'skus.id'},'skus.product_id','skus.image_url','skus.price','skus.number')
      .leftJoin('product','skus.product_id','product.id')
      .column('product.descript')
      .leftJoin('classify','product.classify_id','classify.id')
      .column('cart.goodsnumber','skus.stock','classify.name')
      console.log(cartData,222)
      res.json({
        code: 200,
        data: cartData
      })
    }catch(e){
      console.log(e)
      res.json({
        code: 0,
        message: '服务器错误'
      })
    }
  },
  singleSkus: async function(req,res,next){
    let id = req.params.id;
    try{
      let priceData = await skusModels.single(id)
      res.json({
        code:200,
        data: priceData
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
    let user_id = req.body.user_id;
    let skus_id = req.body.skus_id;
    let goodsnumber = req.body.goodsnumber;
      try{
      let cart = await cartModel.where({user_id,skus_id,goodsnumber})
      if(cart[0]){
        let id = cart[0].id
      }else{
        await cartModel.insert({user_id,skus_id,goodsnumber})
      }
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