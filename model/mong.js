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
// 生成blog_schema(数据库约束)
const blogSchema = new Schema({
    title: {
        required: true,
        type: String,
    },
    content: {
        type: String
    },
    date: {
        required: true,
        type: Date,
        default: new Date()
    },
    type: {
        required: true,
        type: String,
    },
    img_arr: { type: Array }
});
// 生成数据表
const Blog = mongoose.model('blog', blogSchema);

const PassWord = mongoose.model('pass_word',
    new Schema({
        token: {
            required: true,
            type: String
        }
    }));


module.exports = {
    Blog, PassWord
}
// module.exports.blog = ;