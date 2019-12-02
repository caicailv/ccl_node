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
// 生成schema(数据库约束)
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
        type: Array,
    },
    img_arr: { type: Array }
});
// 生成数据库
const Blog = mongoose.model('blog', blogSchema);

// 添加数据
function add(list, callback) {
    new Blog({
        title: list.title,
        content: list.content,
        type: list.type,
        img_arr: list.img_arr
    }).save((err, ret) => {
        if (err) {
            callback(err)
        } else {
            callback()
        }
    });
}
// 删除
// function remove(){

// }
// 编辑

// 查询所有
function find(callback) {
    Blog.find((err, ret) => {
        if (err) {
            callback(err)
        } else {
            callback(null, ret)
        }
    })
}
// 查询单个
function findById(id,callback) {
    Blog.findById(id,(err, ret) => {
        if (err) {
            callback(err)
        } else {
            callback(null, ret)
        }
    })
}

module.exports = {
    add,
    find,
}
