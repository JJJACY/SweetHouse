const userModles = require('../models/user');
const addressModels = require('../models/address');
const orderModels = require('../models/order');

const userControllers ={
  all: async function(req,res,next){
    let nickname = req.query.nickname;
    let pageSize = req.query.pageSize || 10;
    let nowPage = req.query.nowPage || 1;
    let offset = (nowPage-1)*pageSize;
    let params = {}
    if(nickname) params.nickname = nickname;
    try{
      const user = await userModles.where(params)
      .offset(offset)
      .limit(pageSize)
      .orderBy('id','desc')
      let totals = await userModles.where(params)
      let total = totals.length;
      res.json({
        code: 200,
        data: user,
        total
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 200,
        message: '服务器错误'
      })
    }
  },
  single: async function(req,res,next){
    let id = req.params.id;
    try{
      let users = await userModles.single(id);
      let user =  users[0]
      let address = await addressModels.where({"user_id":id})
      // .leftJoin('user','address.user_id','user.id')
      // .column({located:'address.located'},{nickname:'user.nickname'},{avatar:'user.avatar'},
      // {descript:'address.descript'},{sex:'user.sex'},{phone:'user.phone'},{default:'address.default'})
      let order = await orderModels.where({"user_id":id})
      res.json({
        code: 200,
        data: {
          user,
          address,
          order
        }
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 200,
        message:'服务器错误'
      })
    }

  }
}
module.exports = userControllers;