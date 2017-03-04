const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//TCP
const TCP1 = require('./tcpServer1'); // 센서 12003
const TCP2 = require('./tcpServer2'); // 도어락 12001
const TCP3 = require('./tcpServer3'); // 전등 12002
const TCP4 = require('./tcpServer4'); // 노크 12000

var socket1,socket2;
var a=0;

TCP2.on('client',function (client) {
    socket1 = client;
})
TCP3.on('client',function (client) {
  socket2 = client;
})

// Route
const dashboard = require('./routes/dashboard');
const sensors = require('./routes/sensors');
const devices = require('./routes/devices');

// DB
//const models = require('../models');

const app = express();

app.io = require('socket.io')();

app.set('views',path.join(__dirname,'views/pages'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',dashboard);
app.use('/sensors',sensors);
app.use('/devices',devices);

TCP1.on('close',function () {
  app.io.emit('close');
})

TCP1.on('data',function (data) {
  /*
    온도 : dataArray[0],
    습도 : dataArray[1],
    가스 : dataArray[2],
    불꽃 : dataArray[3]
  */
  var dataArray = data.split(',');
  app.io.emit('dashValue',dataArray);

  console.log("TCP1 :"+dataArray);
})
TCP2.on('data',function (data) {
  var dataArray = data.split(',');
  console.log("TCP2 :"+dataArray);
})
TCP3.on('data',function (data) {
  var dataArray = data.split(',');
  console.log("TCP3 :"+dataArray);
})
TCP4.on('data',function (data) {
  var dataArray = data.split(',');

  if(dataArray[1]=='1041'){
    writeData(socket1,"1");
  }
  else if(dataArray[1]=='1011'){
    if(a%2==0){
        writeData(socket2,"2");
    }
    else{
      writeData(socket2,"3");
    }
    a++;
  }
})

app.io.on('door',function () {
  console.log("TlLTNTLNTLn");
})

// TCP 쓰기 함수
  function writeData(client,data) {
  var success = !client.write(data);
  if(!success){
    (function (client,data) {
      client.once('drain',function () {
        writeData(client,data);
      });
    })(client,data);
  }
}

module.exports = app;
