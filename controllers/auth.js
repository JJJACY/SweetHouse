const userModels = require('../models/User.js');
const manageModels = require('../models/Manage.js');


const authControllers = {
  login: async function(res,req,next){
    let phone = res.body.phone;
    let password = res.body.password;
    if(!phone || !password){
      res.json({
        code: 0,
        message:'缺少参数'
      })
    }
    try{
      let manages = await manageModels.where({phone,password})
      if(manages === 0 ){
        res.json({
          code:0,
          message:'手机或密码错误'
        })
        return
      }
      let encryption = manager[0].phone+'/t'+manager[0].name+'/t'+manager[0].id
      let token = authcode(encryption,'INCODE')
      res.json({
        code:200,
        data:{
          name:manager[0].name,
          status:manager[0].status,
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
module.export = authControllers;