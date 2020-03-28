const productModels = require('../models/product.js');

const productControllers = {
  all: async function(req,res,next){
    let classify_id = req.query.classify_id;
    let pageSize = req.query.pageSize || 10;
    let nowPage = req.query.nowPage || 1;
    let offset = (nowPage-1)*pageSize;
    let params = {}
    if(classify_id){
      params = {'product.classify_id':classify_id}
    }
    try{
      let product = await productModels.where(params)
        .leftJoin('classify','product.classify_id','classify.id')
        .column("*",{'id':'product.id'},{'name':'product.name'},{'classify_name':'classify.name'})
        .offset(offset)
        .limit(pageSize)
      let totals = await productModels.where(params)
      let total = totals.length
      res.json({
        code: 200,
        data: product,
        total
      })
    }catch(err){
      console.log(err)
      json({
        code: 0,
        message:'服务器错误'
      })
    }
  }, 
  single: async function(req,res,next){
    let id = req.params.id;
    try{
      let productArr = await productModels.single(id)
      let products = productArr[0]
      res.json({
        code: 200,
        data: products
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
    let name = req.body.name;
    let descript = req.body.descript;
    let quill = req.body.quill;
    let classify_id =req.body.classify_id;
    let skus_id = req.body.skus_id;
    let price_discount = req.body.price_discount;
    let bannerArr = req.body.banner
    if(!name || !descript || !quill || !classify_id || !skus_id || !price_discount || !bannerArr){
      res.json({
        code: 0,
        message:'缺少参数'
      })
    }
    try{
      bannerArr = bannerArr.map(arr =>{return {url: arr.url} })
      let banner =JSON.stringify(bannerArr)
      await productModels.insert({name,descript,quill,classify_id,banner,price_discount})
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
    let descript = req.body.descript;
    let quill = req.body.quill;
    let classify_id =req.body.classify_id;
    let skus_id = req.body.skus_id;
    let bannerArr = req.body.banner;
    if(!id || !name || !descript || !quill || !classify_id || !skus_id || !banner){
      res.json({
        code: 0,
        message:'缺少参数'
      })
    }
    try{
      bannerArr = bannerArr.map(arr =>{return {url: arr.url} })
      let banner =JSON.stringify(bannerArr)
      let products = await productModels.update(id,{name,descipt,quill,classify_id,skus_id,banner})
      let product = products[0];
      res.json({
        code: 200,
        data: product,
        message:'修改成功'
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
      await productModels.delete(id)
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
  },
  uppershelf: async function(req,res,next){
    let id = req.params.id;
    let status = null;
    try{
      await productModels.update(id,{status:0})
      res.json({
        code: 200,
        message:'上架成功'
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  lowershelf: async function(req,res,next){
    let id = req.params.id;
    let status = null;
    try{
      await productModels.update(id,{status:1})
      res.json({
        code: 200,
        message:'下架成功'
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  }
}
module.exports = productControllers