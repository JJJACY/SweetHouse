const orderModels = require('../models/order');
const {formatTime} = require('../utils/formatDate');

const WxorderControllers= {
  single: async function(req,res,next){
    let user_id = req.params.id;
    console.log(user_id)
    try{
      let order = await orderModels.where({user_id})
      // .leftJoin('user','order.user_id','user.id')
      .leftJoin('skus','order.skus_id','skus.id')
      .column('order.id','skus.image_url','order.statu','order.verse',
      'order.created_time','order.count','order.money')
      order.forEach(arr=>{
        arr.created_time = formatTime(arr.created_time)
      })
      res.json({
        code:200,
        data: order
      })
      console.log(order)
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message:'服务器错误'
      })
    }
  },
  singleOrder: async function(req,res,next){
    let id  = req.params.id;
    console.log(id)
    try{
      let orderData = await orderModels.where({'order.id':id})
      .leftJoin('skus','order.skus_id','skus.id')
      .column('skus.price','skus.image_url','order.count','order.created_time','order.verse')
      .leftJoin('product','skus.product_id','product.id')
      .column({'descript':'product.descript'})
      .leftJoin('address','order.address_id','address.id')
      .column('address.located','address.name','address.phone')
      console.log(orderData,111)
      res.json({
        code: 200,
        data: orderData
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
module.exports = WxorderControllers