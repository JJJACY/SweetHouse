const skusModels = require('../models/skus.js');

const skusControllers ={
  all:async function(req,res,next){
    // let price = req.query.price;
    // let sold = req.query.sold;
    let product_id = req.query.product_id;
    let pageSize = req.query.pageSize || 5
    let nowPage = req.query.nowPage || 1
    let offset = (nowPage-1)*pageSize
    let params = {}
    if(product_id) params.product_id = product_id;
    // if(price) params.price = price;
    // if(sold) params.sold = sold;
    try{
      const all =  await skusModels.where(params)
      .offset(offset)
      .limit(pageSize)
      let total = await skusModels.where(params)
      .leftJoin('product','skus.product_id','product.id').count({total:'product_id'})
      // let total = totals.length
      res.json({
        code: 200,
        data: all,
        total: total[0].total
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message: '服务器错误'
      })
    }
  },
  insert: async function(req,res,next){
    let product_id = req.body.product_id;
    let image_url = req.body.image_url;
    let price = req.body.price;
    let number = req.body.number;
    let stock = req.body.stock;
    let sold = req.body.sold;
    let status = 0;
    if(!product_id || !image_url|| !price || !number  || !stock || !sold){
      res.json({
        code: 0,
        message: '缺少参数'
      })
    }try{
      await skusModels.insert({product_id,price,number,stock,image_url,status,sold})
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
    let product_id = req.body.product_id;
    let price = req.body.price;
    let number = req.body.number;
    let stock = req.body.stock;
    let sold = req.body.sold
    let image_url = req.body.image_url;
    let status = req.body.status;
    if(!product_id || !price || !number || !stock || !image_url || !status || !sold){
      res.json({
        code: 0,
        message: '缺少参数'
      })
    }else{
      try{
        await skusModels.update(id,{product_id,price,number,stock,image_url,status,sold})
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