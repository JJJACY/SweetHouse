var express = require('express');
var router = express.Router();

/* GET users listing. */
const middleAuth = require('./../middleauth/middleauth');
const qiniuController = require('../controllers/qiniu');
const authControllers = require('../controllers/auth');
const classifyControllers = require('../controllers/classify');
const manageControllers = require('../controllers/manage');
const orderControllers = require('../controllers/order');
const productControllers = require('../controllers/product');
const skusControllers = require('../controllers/skus');
const bannerControllers = require('../controllers/banner');
const userControllers = require('../controllers/user');
const WxaddressControllers = require('../controllers/Wxaddress');
const WxcartControllers = require('../controllers/Wxcart');
const WxorderControllers = require('../controllers/Wxorder');
const WxproductControllers = require('../controllers/Wxproduct');

//登陆
router.post('/authLogin',authControllers.login);

//七牛云
router.get('/qiniu-uploadtoken',qiniuController.uploadToken);


//管理员接口
router.get('/manage',middleAuth,manageControllers.all);
router.get('/manage/:id',middleAuth,manageControllers.single);
router.post('/manage',middleAuth,manageControllers.insert);
router.put('/manage/:id',middleAuth,manageControllers.update);
router.delete('/manage/:id',middleAuth,manageControllers.delete);

//分类接口
router.get('/classify',middleAuth,classifyControllers.all);
router.post('/classify',middleAuth,classifyControllers.insert);
router.put('/classify/:id',middleAuth,classifyControllers.update);
router.delete('/classify/:id',middleAuth,classifyControllers.delete);

//订单接口
router.get('/order',middleAuth,orderControllers.all);
router.get('/order/:id',middleAuth,orderControllers.single);
router.delete('/order/:id',middleAuth,orderControllers.delete);

//商品接口
router.get('/product',middleAuth,productControllers.all);
router.get('/product/:id',middleAuth,productControllers.single);
router.post('/product',middleAuth,productControllers.insert);
router.put('/product/:id',middleAuth,productControllers.update);
router.delete('/product/:id',middleAuth,productControllers.delete);
router.put('/product/uppershelf/:id',middleAuth,productControllers.uppershelf); //上架
router.put('/product/lowershelf/:id',middleAuth,productControllers.lowershelf); //下架

//skus接口
router.get('/skus',middleAuth,skusControllers.all);
router.post('/skus',middleAuth,skusControllers.insert);
router.put('/skus/:id',middleAuth,skusControllers.update);
router.delete('/skus/:id',middleAuth,skusControllers.delete);


//banner接口
router.post('/banner',middleAuth,bannerControllers.insert);
router.get('/banner',middleAuth,bannerControllers.all);
router.delete('/banner/:id',middleAuth,bannerControllers.delete);

//user接口
router.get('/user',middleAuth,userControllers.all);
router.get('/user/:id',middleAuth,userControllers.single);





















//小程序接口
//首页







//分类










//商品接口




//购物车





//收获地址
// router.post('/Wxaddress',middleAuth,WxaddressControllers.insert);
// router.get('/Wxaddress/:id',middleAuth,WxaddressControllers.single);
// router.get('/Wxaddress/:id',middleAuth,WxaddressControllers.default);
// router.put('/Wxaddress/:id',middleAuth,WxaddressControllers.update);
// router.delete('/Wxaddress/:id',middleAuth,WxaddressControllers.delete);













































module.exports = router;
