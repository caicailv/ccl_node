let express = require('express');
let app = express();
let fs = require('fs');
let path = require('path');
let router = require('./router');
app.all("*",function (req,res,next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
});
app.use('/public/', express.static(path.join(__dirname,'./public/')));
app.use('/demo/', express.static(path.join(__dirname,'./demo/')));
app.use('/dist/', express.static(path.join(__dirname,'./dist/')));
app.use('/static/', express.static(path.join(__dirname,'./dist/static')));
app.use(router);

app.listen(3001,function(){
    console.log('ccl_blog服务器启动成功 3001');
})
