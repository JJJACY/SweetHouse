const productModels = require('../models/product.js');
const skusModels = require('../models/skus.js');


const productControllers = {
  all: async function(req,res,next){
    let classify_id = req.query.classify_id;
    // let product_skus_id = req.query.product_skus_id;
    // console.log(product_skus_id)
    let pageSize = req.query.pageSize || 6;
    let nowPage = req.query.nowPage || 1;
    let offset = (nowPage-1)*pageSize;
    let params = {}
    if(classify_id){
      params = {'product.classify_id':classify_id}
    }
    // if(product_skus_id) params.product_skus_id = product_skus_id
    // console.log(product_skus_id)
    try{
      let product = await productModels.where(params)
        .leftJoin('classify','product.classify_id','classify.id')
        // .column("*",{'id':'product.id'},{'name':'product.name'},{'classify_name':'classify.name'})
        // .column("*")
        .leftJoin('skus','product.id','skus.product_id')
        .column({name:'product.name'},{id:'product.id'},{'price':'skus.price'},{'sold':'skus.sold'},{stock:'skus.stock'},{'status':'skus.status'},{image_url:'skus.image_url'},
        {price_discount:'product.price_discount'},{classify_name:'classify.name'},{descript:'product.descript'})
        .offset(offset)
        .limit(pageSize)
      let total = await productModels.where(params)
      .leftJoin('classify','product.classify_id','classify.id')
      .leftJoin('skus','product.id','skus.product_id').count({total:'skus.id'})
      res.json({
        code: 200,
        data: product,
        total:total[0].total
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
      products.banner = JSON.parse(products.banner)
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
    let image_Url = req.body.image_Url;
    let price_discount = req.body.price_discount;
    let bannerArr = req.body.banner
    if(!name || !descript || !quill || !classify_id || !image_Url || !price_discount || !bannerArr){
      res.json({
        code: 0,
        message:'缺少参数'
      })
    }
    try{
        console.log(typeof bannerArr )
        bannerArr = bannerArr.map(arr =>{return {url: arr.url} })
        let banner =JSON.stringify(bannerArr)
      await productModels.insert({name,descript,quill,classify_id,banner,price_discount,image_Url})
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
    let image_Url = req.body.image_Url;
    let descript = req.body.descript;
    let quill = req.body.quill;
    let classify_id =req.body.classify_id;
    let price_discount = req.body.price_discount;
    let bannerArr = req.body.banner;
    if(!id || !name || !descript || !quill || !classify_id || !price_discount || !bannerArr || !image_Url){
      res.json({
        code: 0,
        message:'缺少参数'
      })
    }
    try{
      bannerArr = bannerArr.map(arr =>{return {url: arr.url} })
      console.log(bannerArr,111)
      let banner =JSON.stringify(bannerArr)
      let products = await productModels.update(id,{name,descript,quill,classify_id,price_discount,banner,image_Url})
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
    console.log(123)
    let id = req.params.id;
    console.log(id)
    try{
      await skusModels.update(id,{status:0})
      res.json({
        code: 200,
        message:'上架成功'
      })
    }catch(err){
      console.log(123,err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  lowershelf: async function(req,res,next){
    let id = req.params.id;
    try{
      await skusModels.update(id,{status:1})
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