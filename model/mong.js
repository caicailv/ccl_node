// 导入mongoose
let mongoose = require("mongoose");
let Schema = mongoose.Schema;
// 设置连接路径
const mongodbUrl = "mongodb://localhost/blog";

// 连接数据库
mongoose.connect(
    mongodbUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// 获取连接信息 并输出 
var db = mongoose.connection;
db.on('connected', function (err) {
    if (err) {
        console.log('连接数据库失败!');
    } else {
        // console.log('连接数据库成功!');
    }
});
// 技术博客
const Skill = mongoose.model('skill',
    new Schema({
        title: {
            required: true,
            type: String,
        },
        content: {
            type: String
        },
        tips: {
            type: Array
        },
        date: {
            required: true,
            type: Date,
        },
    })
);
// 随笔
const Essay = mongoose.model('essay',
    new Schema({
        title: {
            required: true,
            type: String
        },
        date: {
            required: true,
            type: Date
        },
        content: {
            type: String
        },
    })
)
// 图片
const Photo = mongoose.model('photo',
    new Schema({
        title: {
            required: true,
            type: String,
        },
        date: {
            required: true,
            type: Date,
        },
        photos: { type: Array }
    })
)

// 密码
const PassWord = mongoose.model('pass_word',
    new Schema({
        token: {
            required: true,
            type: String
        }
    }));


module.exports = {
    Skill, Essay, Photo, PassWord
}