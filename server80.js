let express = require('express');
let app = express();
var fs = require("fs");
let path = require('path');
let severLocalhost = 80;
app.use('/static', express.static(path.join(__dirname, './dist/static')));
app.get('/', function (req, res) {
    fs.readFile("./dist/index.html", function (err, data) {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
        }
        else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(data.toString());
        }
        res.end();

    });

})
app.listen(severLocalhost, function () {
    console.log('ccl_blog服务器启动成功' + severLocalhost);
})
