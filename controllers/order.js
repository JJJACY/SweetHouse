const orderModels = require('../models/order.js');
const {formatTime} = require('../utils/formatDate.js');

const orderControllers ={
  all: async function(req,res,next){
    let verse = req.query.verse;//订单号
    let status = req.query.status; //状态
    let pageSize = req.query.pageSize || 10 
    let nowPage = req.query.nowPage || 1
    let offset = (nowPage-1)*pageSize
    let params = {};
    if(verse) params.verse = verse;
    if(status) params.status = status;
    try{
      let order = await orderModels.where({params})
      .offset(offset)
        .limit(pageSize)
        .orderBy('created_time',"desc")
      order.forEach(arr=>{
        arr.created_time = formatTime(arr.created_time)
      })
      res.json({
        code: 200,
        data: order,
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
      .column('*',{'id':'order.id'})
      orders.forEach(arr=>{
        arr.created_time = formatTime(created_time)
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