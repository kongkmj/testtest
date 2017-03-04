const net = require('net');
const EventEmitter = require('events');

module.exports = new EventEmitter();
// TCP Port 설정
const tcpPort = 12000;

const tcpServer = net.createServer();

  tcpServer.on('connection',handleConnection);

  function handleConnection(client) {
  var remoteAddress = client.remoteAddress + ':' +client.remotePort;
  exports.socket = client;
  console.log('new Client1 connection from %s',remoteAddress);
  client.on('error',clientError);
  client.once('close',clientClose);
  client.on('data',clientData);

  function clientError(err) {
    console.log('Connection %s error: %s',remoteAddress,err.message);
  }
  function clientClose() {
    module.exports.emit('close');
    console.log('connection from %s closed ',remoteAddress);
  }
  function clientData(data) {
    module.exports.emit('data',data.toString());
    //console.log('Client1 data from %s : %s',remoteAddress,data);
  }
};


tcpServer.listen(tcpPort,()=>{
  console.log("server listeing to %j",tcpServer.address());
});
