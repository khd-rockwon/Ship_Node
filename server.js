const net = require('net');

const maria = require('mysql');
const {response} = require("express");

var connection = maria.createConnection({

  host:'192.168.50.54',
  post:3306,
  user:'shovvel',
  password:'rockwon12!',
  database:'TEST'

})


connection.connect();

var imei;

const server = net.createServer(function (client) {
  console.log('   local = %s:%s', client.localAddress, client.localPort);
  console.log('   remote = %s:%s', client.remoteAddress, client.remotePort);

  client.on('data', function (data) {
    console.log("확인1 : " + data.toString());

    imei = data.slice(4,14);
    var stringData = data.toString();

    console.log("data.slice : " + data.slice(4,14));
    console.log("imei확인1 : " + imei);
    console.log("stringData : " + stringData);

    connection.query('INSERT INTO wearableData(data) VALUES (?)', [stringData],
        function(err, result) {
          if(err) throw err;
          console.log("result :: " + result.rowsAffected);
        });

     // var sql = `INSERT INTO wearableData(data) VALUES ?`;
     // var values = [stringData];
     //
     // connection.query(sql, values, function(err, result){
     //   if(err) throw err;
     //   console.log("result :: " + result.rowsAffected);
     // });

  });

  console.log("imei확인2 : " + imei);

  result = '[3G*'.concat(imei, `*0002*CR]`);
  console.log("result 확인 : " + result);

  client.write(result);
  // client.write('[3G*9024025633*0002*CR]');
  console.log("클라이언트 : " + `[3G*` + imei + `*0002*CR]`);



  // console.log("확인2 :" + `[3G*` + imei.toString() + `*0002*CR]`);
  // client.write('[3G*'+imei.toString()+'*0002*CR]');
})

server.listen(30000, function () {

  console.log('Server listening: ' + JSON.stringify(server.address()))

  server.on('close', function () {
    console.log('Server Terminated')
  })

  server.on('error', function (err) {
    console.log('Server Error: ', JSON.stringify(err))
  })
})




