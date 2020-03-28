const manageModels = require('../models/Manage.js');
const authcode = require('../utils/authcode');
const config = require('../config');
// const axios = require('axios');

const authControllers = {
  login: async function(req,res,next){
    let phone = req.body.phone;
    let password = req.body.password;
    if(!phone || !password){
      res.json({
        code: 0,
        message:'缺少参数'
      })
    }
    try{
      let manages = await manageModels.where({phone,password})
      console.log(manages)
      if(manages.length === 0 ){
        res.json({
          code:0,
          message:'手机或密码错误'
        })
        return
      }
      let encryption = manages[0].phone+'/t'+manages[0].name+'/t'+manages[0].id
      let token = authcode(encryption,'INCODE')
      res.json({
        code:200,
        data:{
          name:manages[0].name,
          status:manages[0].status,
          token,
        }
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
module.exports = authControllers;
