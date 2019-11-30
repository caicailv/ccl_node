let express = require('express');
let router = express.Router();
let multiparty = require("multiparty");
let path = require('path');
let fs = require('fs');
let serverConfig = require('../serverConfig');
let mongoose = require('../model/mong');
// const glob = require('glob');
router.get('/setdata', function (req, res) {
    res.json({
        status: true,
        msg: '这是一个测试setdata接口'
    })
});
// 添加一条技术博客
/* 
1. 提取参数
2. 存入数据库
设计数据库存入规则


*/
// console.log(mongoose);
router.post("/add_skill", (req, res) => { 
    // console.log(req.body);
    
    res.json({
         status:true,
         msg:'添加博客成功'
    })
});
router.post("/add_img", (req, res) => {
    console.log(req.body);
    res.json({
         status:true,
         msg:'添加图片成功'
    })
});
module.exports = router; 
