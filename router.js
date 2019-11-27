let express = require('express');
let router = express.Router();
let multiparty = require("multiparty");
let path = require('path');
let fs = require('fs');
let serverConfig = require('./serverConfig');
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
            console.log('原路径:' + uploadedPath);
            var dstPath = './public/files/' + files.file[0].originalFilename;//拿到文件名
            console.log('新路径:' + dstPath);
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
// 相册展示 
router.get('/v1/album', function (req, res) {
    res.json(
        [
            {
                id: 1,
                title: "今天傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/1.jpg'
            },
            {
                id: 2,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/2.jpg'
            },
            {
                id: 3,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/3.jpg'
            },
            {
                id: 4,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/4.jpg'
            },
            {
                id: 5,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/5.jpg'
            },
            {
                id: 6,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/6.jpg'
            },
            {
                id: 7,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/7.jpg'
            },
            {
                id: 8,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/8.jpg'
            },
            {
                id: 9,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/9.jpg'
            },
            {
                id: 10,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/10.jpg'
            },
            {
                id: 11,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/10.jpg'
            },
            {
                id: 12,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/10.jpg'
            },
            {
                id: 13,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/10.jpg'
            },
            {
                id: 14,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/10.jpg'
            },
            {
                id: 15,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/10.jpg'
            },
            {
                id: 16,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/10.jpg'
            },
            {
                id: 17,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/10.jpg'
            },
            {
                id: 18,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/10.jpg'
            },
            {
                id: 19,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/10.jpg'
            },
            {
                id: 20,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/10.jpg'
            },
            {
                id: 21,
                title: "今天和傻屌出去玩",
                img_scr: 'http://localhost:3001/public/img/10.jpg'
            },
        ]
    )
});
module.exports = router; 
