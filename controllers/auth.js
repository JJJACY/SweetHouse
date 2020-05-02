const manageModels = require('../models/Manage.js');
const userModels = require('../models/user');
const authcode = require('../utils/authcode');
const config = require('../config');
const axios = require('axios');

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
      console.log(token)
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
    
  },
  wxlogin: async function(req,res,next){
    let appid = config.wechat.appid;
    let secret = config.wechat.secret;
    let js_code = req.body.code;
    let userInfo = req.body.userInfo;
    try{
      let data = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`)
      let open_id = data.data.openid;
      if(!open_id || open_id.length !== 28){
        res.json({
          code: 0 ,
          message:'服务器错误'
        })
        return
      }
      let user = await userModels.where({open_id});
      let id;
      if(user[0]){
        id = user[0].id
      }else{
        let userData = await userModels.return({nickname:userInfo.nickName,openid,avatar:userInfo.avatarUrl})
        id = userData[0];
      }
      res.json({
        code: 200,
        data: id
      })
    }catch(e){
      console.log(e)
      res.json({
        code: 0,
        message:'服务器错误'
      })

    }
  }
}
module.exports = authControllers;
