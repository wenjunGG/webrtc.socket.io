### notification
notification with socket.io
#### 1
npm install 
#### 2
node index.js
#### 3
open the browser and visit https://localhost:8080/

### 前言
> socket.io: 包含对websocket的封装，可实现服务端和客户端之前的通信。详情见[官网](http://socket.io) (虽然是英文文档，但还是通俗易懂)。
  Notification: Html5新特性，用于浏览器的桌面通知，只有部分浏览器支持。
  通过nodejs+Socket.io+Notification实现服务端往浏览器客户端发送自定义消息。
  webrtc PeerConnection管道建立，本地及远程视频通信
  
### 开发前提
本地安装nodejs以及npm
对nodejs以及express框架有一定了解。（本篇将和官方文档一样，采用express 4.10.2）
对webrtc知识 有些一定了解

### WebRTC之PeerConnection的建立过程
![截图](https://images2015.cnblogs.com/blog/778894/201601/778894-20160105185733668-1519668935.png)
注意：两边createPeerconnection 可以同时建立，只用建立一个数据传输管道，可以根据不同参数控制

### 环境搭建
- 安装express(指定版本4.10.2，没有试过其他版本，感兴趣可以试下) `npm install --save express@4.10.2`
- 安装socket.io(本人安装的版本是1.7.3) `npm install --save socket.io`
- https 域名证书
- 内网穿透服务

### 编写代码
#### 构建通信环境
新建一个index.js文件，并在js文件中构建相应的对象和变量，创建监听端口为8080 的服务器，以及添加映射到index.html的路由。

```bash
let express = require('express'),
    app = express(),
    fs = require('fs');

const serverConfig = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem'),
};


let https = require('https').Server(serverConfig, app),
    io = require('socket.io')(https);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendfile('index.html');
});
https.listen(8080, function() {
    console.log('https listening on port 8080');
})
```
运行 `node index.js` 用浏览器打开https://localhost:8080 成功的话即可看到index.html页面的内容。

### 基于websocket 建立 webrtc链接



### 参考链接

notification示例代码见(https://github.com/yezihaohao/notification)

WebRTC1-原理探究(https://blog.csdn.net/future_todo/article/details/52689420)

WebRTC基础实践(https://blog.csdn.net/renfufei/article/details/84586900)

WebRTC Example (https://github.com/shanet/WebRTC-Example)