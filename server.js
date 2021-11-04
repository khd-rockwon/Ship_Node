const net = require('net');
const maria = require('mysql');
const {response} = require("express");

//소켓서버 에러 해결 테스트
const axios = require("axios");
axios.default.timeout = 5 * 1000;


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

  var i = 1;

  client.on('data', function (data) {
    console.log("***전송받은 데이터 : " + data.toString());

    //전송받은 데이터에서 imei값 추출
    imei = data.slice(4,14);

    //전송받은 데이터를 문자열로 변환
    var stringData = data.toString();

    // console.log("imei추출결과 확인 : " + imei);
    // console.log("전송받은 데이터 문자열로 변환한 결과 확인 : " + stringData);

    //전송받은 데이터 DB에 저장
    connection.query('INSERT INTO wearableData(data) VALUES (?)', [stringData],
        function(err, result) {
          if(err) throw err;
          console.log("result :: " + result.rowsAffected);
        });

    //GPS데이터를 전송받기 위한 명령어 생성
     result = '[3G*'.concat(imei, `*0002*CR]`);
     console.log("GPS데이터 받기위한 명령어 확인 : " + result);
     console.log("")
     console.log("")
     
    //명령어 보내기
    
    if(i==1) {
      client.write(result);
      i = i + 1;
    }




    client.on ( 'error', function (err) {console.error (err)})





  });


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




