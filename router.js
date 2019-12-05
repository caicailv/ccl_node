let express = require('express');
let router = express.Router();
let multiparty = require("multiparty");
let path = require('path');
let fs = require('fs');
let serverConfig = require('./serverConfig');
// 导入时间处理工具 moment
const moment = require('moment');
let Blog = require('./model/mong');

router.get('/', function (req, res) {
    res.send('欢迎使用 ccl_blog_api_cc');
});
/* 上传图片 */
router.post('/file/uploading', function (req, res, next) {
    /* 生成multiparty对象，并配置上传目标路径 */
    var form = new multiparty.Form();
    /* 设置编辑 */
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = './public/files';
    //设置文件大小限制
    form.maxFilesSize = 2 * 1024 * 1024;
    // form.maxFields = 1000;  //设置所有文件的大小总和
    //上传后处理
    form.parse(req, function (err, fields, files) {
        var filesTemp = JSON.stringify(files, null, 2);
        if (err) {
            console.log('parse error:' + err);
        } else {
            // 上传成功
            console.log('上传成功:' + filesTemp);
            // var inputFile = files.inputFile[0];
            var uploadedPath = files.file[0].path;//拿到文件路径
            // console.log('原路径:' + uploadedPath);
            var dstPath = './public/files/' + files.file[0].originalFilename;//拿到文件名
            // console.log('新路径:' + dstPath);
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error:' + err);
                } else {
                    res.json({
                        status: true,
                        data: {
                            url: `http://localhost:${serverConfig.localhost}${dstPath.substring(1, dstPath.length)}`,
                        }
                    });
                }
            })
        }

    })
})
// 添加一条博客 
router.post("/add_blog", (req, res) => {
    new Blog(req.body).save((err, ret) => {
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
    });
});
// 查询博客列表
/* 
    query: 查询条件
*/
router.get('/query_blog', (req, res) => {
    Blog.find(req.query, (err, ret) => {
        // console.log(req.query);
        if (err !== null) {
            res.json({
                status: false,
                msg: '查询失败'
            })
        } else {
            let arr = JSON.parse(JSON.stringify(ret));
            arr.forEach(el => {
                el.date = moment(el.date).format("YYYY-MM-DD hh:mm");
                // el.content = el.content.substr(0,30)+"...";
            });
            res.json({
                status: true,
                data: arr
            })
        }
    })
})
/* 
    查询博客详情
    _id : 博客id
*/
router.get('/query_blogdetail', (req, res) => {
    Blog.findOne(req.query, (err, doc) => {
        if (err !== null) {
            res.json({
                status: false,
                msg: '查询失败'
            })
        } else {
            let obj = JSON.parse(JSON.stringify(doc));
            obj.date = moment(obj.date).format("YYYY-MM-DD hh:mm");
            res.json({
                status: true,
                data:obj
            })
        }
    })
});
module.exports = router; 
