const userModles = require('../models/user');

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
      res.json({
        code: 200,
        data: users[0]
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