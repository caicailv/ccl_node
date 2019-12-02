let express = require('express');
let router = express.Router();
let multiparty = require("multiparty");
let path = require('path');
let fs = require('fs');
let serverConfig = require('../serverConfig');
let Mongoose = require('../model/mong');

// 导入时间处理工具 moment
const moment = require('moment');
router.get('/setdata', function (req, res) {
    res.json({
        status: true,
        msg: '这是一个测试setdata接口'
    })
});
// 添加一条技术博客
router.post("/add_skill", (req, res) => {
    Mongoose.add(req.body, err => {
        if (err) {
            res.json({
                status: false,
                msg: err
            });
        } else {
            res.json({
                status: true,
                msg: '添加成功'
            });
        }
    })
});
// 添加一条图片博客
router.post("/add_img", (req, res) => {
    console.log(req.body.img_arr);
    Mongoose.add(req.body, err => {
        if (err) {
            res.json({
                status: false,
                msg: err
            });
        } else {
            res.json({
                status: true,
                msg: '添加成功'
            });
        }
    })
});
// 查询博客列表
router.get('/bloglist', (req, res) => {
    Mongoose.find((err, ret) => {
        if (err !== null) {
            res.json({
                status: false,
                msg: '查询失败'
            })
        } else {
            let arr = JSON.parse(JSON.stringify(ret));
            arr.forEach(el => {
                el.date = moment(el.date).format("YYYY-MM-DD hh:mm");
            });
            res.json({
                status: true,
                data: arr
            })
        }
    })
})
module.exports = router; 
