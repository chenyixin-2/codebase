import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev.config.js'

// tcp socket 
var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');

server.on('connection', function(socket) {
  console.log('A new connection has been established.');

  // Now that a TCP connection has been established, the server can send data to
  // the client by writing to its socket.
  socket.write('Hello, client.');

  // The server can also receive data from the client by reading from its socket.
  socket.on('data', function(chunk) {
      console.log(`Data received from client: ${chunk.toString()}.`);
  });

  // When the client requests to end the TCP connection with the server, the server
  // ends the connection.
  socket.on('end', function() {
      console.log('Closing connection with the client');
  });

  // Don't forget to catch error, for your own sake.
  socket.on('error', function(err) {
      console.log(`Error: ${err}`);
  });
});

// http server
const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html'),
            compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))
app.use(webpackHotMiddleware(compiler))
app.get('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
  if (err) {
    return next(err)
  }
  res.set('content-type', 'text/html')
  res.send(result)
  res.end()
  })
})
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})