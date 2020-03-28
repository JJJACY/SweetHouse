const config = require("./../config.js");
const qiniu = require("qiniu");

const qiniuController ={
  upload: async function(req,res,next){
    try{
      const accessKey = config.qiniu.AccessKey;
      const secretKey = config.qiniu.SecretKey;
      const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
      
      var options = {
        scope: bucket,
      };
      var putPolicy = new qiniu.rs.PutPolicy(options);
      var uploadToken=putPolicy.uploadToken(mac);
      
      res.json({
        token:uploadToken,
        domain:'https://q7wbnfs08.bkt.clouddn.com/'
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