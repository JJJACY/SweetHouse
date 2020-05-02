const orderModels = require('../models/order.js');
const {formatDate} = require('../utils/formatDate.js');
const userModels = require('../models/user');

const indexControllers = {
  all:async function(req,res,next){
    try{
      let user = await userModels.all();
      let order = await orderModels.all().orderBy('id','desc');
      let today = formatDate(new Date());
      let todayOrder = [];
      order.forEach( arr => {
        arr.created_time = formatDate(arr.created_time);
        arr.created_time = today ? todayOrder.push(arr) : '';
      })
      res.json({
        code: 200,
        data: {
          user:user.length,
          order:order.length,
          todayOrderNum: todayOrder.length,
          todayOrder
        }
      })

    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message:"服务器错误"
      })
    }
  }
 
}
module.exports = indexControllers
