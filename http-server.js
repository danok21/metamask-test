var http = require('http');
var fs = require('fs');

// 创建服务器
http.createServer((request, response) => {
    if (request.url == '/') {
        fs.readFile("./index.html", function(err, data) {
            if (err) {
                console.log(err);
                // HTTP 状态码: 404 : NOT FOUND
                response.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
                // HTTP 状态码: 200 : OK
                response.writeHead(200, { 'Content-Type': 'text/html' });

                // 响应文件内容
                response.write(data.toString());
            }
            response.end();
        });
    } else {
        response.end("hello world! ");
    }
}).listen(8080);
console.log('Server is running http://localhost:8080');
