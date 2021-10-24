const net = require('net')



const socket = net.Socket()
socket.connect({ host: '220.118.147.50', port: 9025 }, function () {
    socket.on('data', function (chunk) {
        console.log(chunk.toString());
    });

    socket.on('end', function () {
        console.log('Encoder Disconnected');
    });

    socket.write(Buffer.from('hello world'));
});
