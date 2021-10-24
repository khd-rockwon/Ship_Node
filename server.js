const net = require('net')

// const maria = require('mysql')
//
// var connection = maria.createConnection({
//   host:'192.168.50.54',
//   post:3306,
//   user:'shovvel',
//   password:'rockwon12!',
//   database:'TEST'
// })
//
//
// connection.connect();

var imei;

const server = net.createServer(function (client) {
  console.log('   local = %s:%s', client.localAddress, client.localPort);
  console.log('   remote = %s:%s', client.remoteAddress, client.remotePort);

  // client.write('[3G*9024025352*0002*CR]');

  // client.write('[3G*9024025495*0002*CR]');
  // client.write('[3G*9024012880*0002*CR]');
  // client.write('[3G*9024011797*0002*CR]');
  // client.write('[3G*9024025762*0002*CR]');
  // client.write('[3G*9024025584*0002*CR]');
  // client.write('[3G*9024025673*0002*CR]');
  // client.write('[3G*9024011309*0002*CR]');
  // client.write('[3G*9024025509*0002*CR]');
  // client.write('[3G*9024025664*0002*CR]');
  // client.write('[3G*9024025633*0002*CR]');
  // client.write('[3G*9024025484*0002*CR]');
  // client.write('[3G*9024025290*0002*CR]');
  // client.write('[3G*9024024780*0002*CR]');
  // client.write('[3G*9024025519*0002*CR]');
  // client.write('[3G*9024025653*0002*CR]');
  // client.write('[3G*9024025277*0002*CR]');
  // client.write('[3G*9024025568*0002*CR]');
  // client.write('[3G*9024025434*0002*CR]');
  // client.write('[3G*9024011379*0002*CR]');
  // client.write('[3G*9024025352*0002*CR]');
  // client.write('[3G*9024025048*0002*CR]');
  // client.write('[3G*9024025413*0002*CR]');



  client.on('data', function (data) {
    console.log("확인1 : "+data.toString());

    imei = data.slice(4,14);
    imei2 = data.slice(4,14);

     console.log("data.slice : " + data.slice(4,14));
     console.log("imei확인 : " + imei);
    // console.log("imeitostring확인 : " + imei.toString());
    // connection.query( 'INSERT INTO wearableData(data) values(?),', [data]  )

  });

  console.log("imei확인2 : " + imei);
  result = '[3G*'.concat(imei, `*0002*CR]`);
  console.log("result 확인 : " + result);

  client.write(result);
  console.log("클라이언트 : " + `[3G*` + imei + `*0002*CR]`);
  // console.log("표시2 : " + imei);
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




