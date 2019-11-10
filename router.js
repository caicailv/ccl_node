let express = require('express');
let router = express.Router();
router.get('/', function (req, res) {
    res.send('欢迎使用 ccl_blog_api_cc');
});

router.get('/v1/album', function (req, res) {
    res.json(
        [
            {
                id: 1,
                title: "今天和傻屌出去玩",
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
