let express = require('express');
let app = express();
let fs = require('fs');
let path = require('path');
let bodyParser = require('body-parser'); 
let serverConfig = require('./serverConfig');
let router = require('./router');
app.all("*",function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Accept, X-Requested-With , token');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    next();
});

// 解析token获取用户信息
app.use(function (req, res, next) {
    var token = req.headers['token'];
    return next();
});
global.token = 1423;
// 挂载bodyParse 以便接受post参数
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/public/', express.static(path.join(__dirname, './public/')));
app.use('/demo/', express.static(path.join(__dirname, './demo/')));
app.use('/dist/', express.static(path.join(__dirname, './dist/')));
app.use('/static/', express.static(path.join(__dirname, './dist/static')));
app.use(router);

app.listen(serverConfig.localhost, function () {
    console.log('ccl_blog服务器启动成功' + serverConfig.localhost);
})
