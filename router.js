let express = require('express'),
    router = express.Router(),
    multiparty = require("multiparty"),
    path = require('path'),
    fs = require('fs'),
    serverConfig = require('./serverConfig'),
    jwt = require('jsonwebtoken'),//生成token工具
    // 导入时间处理工具 moment
    moment = require('moment'),
    DataBase = require('./model/mong'),
    Skill = DataBase.Skill,
    Essay = DataBase.Essay,
    Photo = DataBase.Photo,
    PassWord = DataBase.PassWord;


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
            // var inputFile = files.inputFile[0];
            var uploadedPath = files.file[0].path;//拿到文件路径
            var dstPath = './public/files/' + files.file[0].originalFilename;//拿到文件名
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error:' + err);
                } else {
                    res.json({
                        status: true,
                        data: {
                            url: `${serverConfig.domainName}:${serverConfig.localhost}${dstPath.substring(1, dstPath.length)}`,
                        }
                    });
                }
            })
        }

    })
})

// 根据type判断表
function Surface(type) {
    if (typeof type === 'string') {
        type = Number(type);
    }
    let Surface = null;
    switch (type) {
        case 0:
            Surface = Skill;
            break;
        case 1:
            Surface = Essay;
            break;
        case 2:
            Surface = Photo;
            break;
        default:
            Surface = Skill;
            break;
    }
    return Surface;
}
// 添加一条博客 
router.post("/add_blog", (req, res) => {
    // token验证
    const token = req.headers.token;
    testToken(token, (ret) => {
        if (ret.status) {
            let params = req.body;
            let SurfacePop = Surface(params.type);
            params.date = new Date();
            delete params._id;
            // 根据type判断留什么字段
            /* 
              0 => 技术
              1 => 随笔
              2 => 照片
            */
            switch (params.type) {
                case 0:
                    delete params.img_arr;
                    params.tips = params.skillActives;
                    params.skillActives = 1;
                    delete params.skillActives;
                    break;
                case 1:
                    delete params.img_arr;
                    delete params.skillActives;
                    break;
                case 2:
                    delete params.skillActives;
                    delete params.content;
                    break;
                default:
                    break;
            }
            delete params.type;
            params = JSON.parse(JSON.stringify(params));
            new SurfacePop(params).save((err, ret) => {
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

        } else {
            res.json({
                status: false,
                msg: ret.msg
            })
        }

    })
});
// 修改
router.post("/emit_blog", (req, res) => {
    // token验证
    const token = req.headers.token;
    testToken(token, (ret) => {
        if (ret.status) {
            let _id = req.body._id;
            let type = req.body.type;
            delete req.body._id;
            delete req.body.type;
            req.body.tips = req.body.skillActives;
            req.body.date = new Date();
            Surface(type).findOneAndUpdate({ _id }, req.body, { useFindAndModify: false }, (err, ret) => {
                if (err) {
                    res.json({
                        status: false,
                        msg: ret.msg
                    })
                } else {
                    ret.date
                    res.json({
                        status: true,
                        data: ret,
                        msg: '修改成功'
                    })

                }
            })

        } else {
            res.json({
                status: false,
                msg: ret.msg
            })
        }

    })
});
// 删除
router.post('/delete_blog', (req, res) => {
    testToken(token, (ret) => {
        if (ret.status) {
            let _id = req.body._id;
            Surface(req.body.type).remove({
                _id
            }, (err, ret) => {
                if (err) {
                    res.json({
                        status: false,
                        msg: ret.msg
                    })
                } else {
                    res.json({
                        status: true,
                        msg: '删除成功'
                    })

                }
            })

        } else {
            res.json({
                status: false,
                msg: ret.msg
            })
        }

    })
})
// 查询博客列表
/* 
    query: 查询条件
*/
router.get('/query_blog', (req, res) => {
    Surface(req.query.type).find({}, (err, ret) => {
        if (err !== null) {
            res.json({
                status: false,
                msg: '暂无数据'
            })
        } else {
            let arr = JSON.parse(JSON.stringify(ret));
            arr.forEach(el => {
                el.date = moment(el.date).format("YYYY-MM-DD HH:mm");
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
    let _id = req.query._id;
    Surface(req.query.type).findOne({ _id }, (err, doc) => {
        if (err !== null || doc === null) {
            res.json({
                status: false,
                msg: '数据已丢失'
            })
        } else {
            let obj = JSON.parse(JSON.stringify(doc));
            obj.date = moment(obj.date).format("YYYY-MM-DD hh:mm");
            res.json({
                status: true,
                data: obj
            })
        }
    })
});
/* 
    登录
*/
router.post('/password', (req, res) => {
    if (req.body.password === serverConfig.password) {
        // 密码正确,生成token
        jwt.sign({
            'password': req.body.password
        }, 'abcdefg', function (err, token) {
            // 存至数据库 返回给前端
            PassWord.findOne({}, function (err, ret) {
                if (err) {
                    res.json({
                        status: false,
                        msg: '生成token失败'
                    })
                } else {
                    // 如果没有,则新增
                    if (ret === null) {
                        new PassWord({
                            token
                        }).save((err, ret) => {
                            if (err) {
                                res.json({
                                    status: false,
                                    msg: '生成token失败'
                                })

                            } else {
                                res.json({
                                    status: true,
                                    data: token
                                });
                            }
                        })
                    } else {
                        //如果有,则替换
                        PassWord.findOneAndUpdate(res.id, { token }, { useFindAndModify: false }, (err, ret) => {
                            if (err) {
                                res.json({
                                    status: false,
                                    msg: '生成token失败'
                                })
                            } else {
                                res.json({
                                    status: true,
                                    data: token
                                });
                            }
                        })

                    }
                }
            })
        })
    } else {
        res.json({
            status: false,
            msg: '密码错误!'
        });
    }
});
// 验证token
function testToken(token, callback) {


    return callback({
        status: true,
        msg: '跳过验证'
    })
    // 取出数据库的token
    PassWord.find({}, (err, ret) => {
        if (err) {
            callback({
                status: false,
                msg: '查询数据库内token出错'
            })
        } else {
            let mongodToken = ret[0].token;
            if (mongodToken === token) {
                callback({
                    status: true,
                    msg: '验证成功'
                })

            } else {
                callback({
                    status: false,
                    msg: '验证信息不匹配'
                });

            }

        }
    })
};


module.exports = router; 
