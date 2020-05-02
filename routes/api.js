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
const indexControllers = require('../controllers/index');
const wxindexControllers = require('../controllers/Wxindex');
const wxclassifyControllers = require('../controllers/Wxclassify');
const WxaddressControllers = require('../controllers/Wxaddress');

const WxcartControllers = require('../controllers/Wxcart');
const WxorderControllers = require('../controllers/Wxorder');
const wxproductControllers = require('../controllers/Wxproduct');

//登陆
router.post('/authLogin',authControllers.login);
router.post('/auth/wxlogin',authControllers.wxlogin);

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

//概况页接口
router.get('/index',middleAuth,indexControllers.all);




















//小程序接口


//首页
router.get('/wxbanner',wxindexControllers.allBanner);
router.get('/wxclassify',wxindexControllers.allClassify);
router.get('/wxproductall',wxproductControllers.all);

//分类
router.get('/wxClassify/:id',wxclassifyControllers.singleGoods);









//商品接口
router.get('/wxProduct/:id',wxproductControllers.singleProduct);



//购物车
router.post('/wxcart',WxcartControllers.insert);
router.get('/wxcart/:id',WxcartControllers.single);
router.get('/wxcartskus/:id',WxcartControllers.singleSkus);


//收获地址
router.post('/wxaddress',WxaddressControllers.insert);
router.get('/wxaddress/:id',WxaddressControllers.single);
router.get('/wxaddress/:id',WxaddressControllers.default);
router.put('/wxaddress/:id',WxaddressControllers.update);
router.delete('/wxaddress/:id',WxaddressControllers.delete);

//订单
router.get('/wxorder/:id',WxorderControllers.single);
router.get('/wxsingleorder/:id',WxorderControllers.singleOrder)












































module.exports = router;
