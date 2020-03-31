const config = require("./../config.js");
const qiniu = require("qiniu");
const domain = config.qiniu.domain;
const qiniuController ={
  uploadToken: async function(req,res,next){
    try{
      const accessKey = config.qiniu.AccessKey;
      const secretKey = config.qiniu.SecretKey;
      const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
      
      var options = {
        scope: 'sweet-house',
      };
      var putPolicy = new qiniu.rs.PutPolicy(options);
      var uploadToken=putPolicy.uploadToken(mac);
      
      res.json({
        token:uploadToken,
        domain
      })
    }catch(err){
      console.log(err)
      res.json({
        code: 0,
        message: '服务器错误'
      })
    }
  } 
}

module.exports = qiniuController