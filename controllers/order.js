const orderModels = require('../models/order.js');
const skusModels = require('../models/skus.js');
const {formatTime} = require('../utils/formatDate.js');

const orderControllers ={
  all: async function(req,res,next){
    let verse = req.query.verse;//订单号
    let statu = req.query.statu; //状态[0:完成，1:未完成，2:取消]
    let count = req.query.count; //数量
    let pageSize = req.query.pageSize || 3
    let nowPage = req.query.nowPage || 1
    let offset = (nowPage-1)*pageSize
    let params = {};
    if(verse) params.verse = verse;
    if(statu) params.statu = statu;
    if(count) params.count = count;
    try{
      let order = await orderModels.where(params)
      .offset(offset)
      .limit(pageSize)
      .orderBy("created_time","desc")
      order.forEach(arr=>{
        arr.created_time = formatTime(arr.created_time)
      })
      let totals = await orderModels.where(params);
      let total = totals.length;
      res.json({
        code: 200,
        data: order,
        total
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  single: async function(req,res,next){
    let id = req.params.id
    try{
      let order = await orderModels.where({'order.id':id})
      .leftJoin('skus','order.skus_id','skus.id')
      .leftJoin('user','order.user_id','user.id')
      .leftJoin('address','order.address_id','address.id')
      // .column('*',{'id':'order.id'})
      .column("*",{statu:'order.statu'})
      order.forEach(arr=>{
        arr.created_time = formatTime(arr.created_time)
        arr.money = ( arr.count * arr.price)
      })
      res.json({
        code:200,
        data: order[0]
      })
    }catch(err){
      console.log(err)
      res.json({
        code:0,
        message:'服务器错误'
      })
    }
  },
  delete: async function(req,res,next){
    let id = req.params.id
    try{
      await orderModels.delete(id)
      res.json({
        code:0,
        message:'删除成功'
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
module.exports =orderControllers;