const configs = {
  mysql: {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'sweethouse'
  },
  qiniu: {
    AccessKey: 'ckYYxI4xwp2etJ9okRlLO0tfzaSkm9hoQte2XKNu',
    SecretKey: 't9yqigKlMgw_qmy9lZjyTJZlKPBnSVAkqpciaA6J',
    bucket:'sweet-house',
    domain: 'http://q7wbnfs08.bkt.clouddn.com'
  },
  wechat:{
    appid: 'wx336141c1e0a638b3',
    secret: '0071daca13068742799a88f603a30f8e'
  }
}

module.exports = configs