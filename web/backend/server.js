// Node.js WebSocket server script
// const http = require('http');
// const WebSocketServer = require('websocket').server;
// const server = http.createServer();
// server.listen(9898);
// const wsServer = new WebSocketServer({
//     httpServer: server
// });
// wsServer.on('request', function (request) {
//     const connection = request.accept(null, request.origin);
//     connection.on('message', function (message) {
//         console.log('Received Message:', message.utf8Data);
//         connection.sendUTF('Hi this is WebSocket server!');
//     });
//     connection.on('close', function (reasonCode, description) {
//         console.log('Client has disconnected.');
//     });
// });

//////////////////////////////////////////////////////////////////
// Express version
//////////////////////////////////////////////////////////////////
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressPort = 3008;

const cors = require("cors");
const formidable = require('formidable')

// for file uploader
const form = new formidable.IncomingForm();

app.use(cors());

//////////////////////////////////////////////////////////////////
// 对不同的 content type 的处理
//////////////////////////////////////////////////////////////////
// json 格式
app.use(bodyParser.json());

// url encode 格式
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/user', (req, res) => {
    console.log(req.query);
    res.send('成功接收');
})

app.get('/download', function (req, res) {
    console.log("Download file");
    const file = `${__dirname}/upload-folder/download.pdf`;
    res.download(file); // Set disposition and send it.
});

app.post('/user', (req, res) => {
    try {
        form.parse(req, function (err, fields, files) {  // <----------------------------- for file uploader
            if (err) next(err);
            res.send('成功接收')
        })
            .on('file', (name, file) => {
                console.log(file);
            })
            .on('field', (name, field) => {
                console.log("Got a field : ", name);
            })
            .on('error', (err) => {
                next(err);
            })
            .on('end', () => {
                res.end();
            });
    } catch (e) {
        console.log(e);
    }
})

app.listen(3008, () => {
    console.log('服务启动');
})