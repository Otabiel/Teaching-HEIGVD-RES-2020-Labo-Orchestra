var net = require('net');
var dgram = require('dgram');
var moment = require('moment');

var musiciens = new Map();



const instrumentFromSound = {
   'ti-ta-ti': 'piano',
   pouet: 'trumpet',
   trulu: 'flute',
   'gzi-gzi': 'violin',
   'boum-boum': 'drum'
};

var socket = dgram.createSocket('udp4');
socket.bind(9907, function() {
    socket.addMembership('239.255.22.5');
});

socket.on('message', function(message, src) {
    console.log("Donnée reçue : " + message);
    const jsonObj = JSON.parse(message);

    var musicien = {
        uuid: jsonObj.uuid,
        instrument: getInstru(jsonObj.sound),
        activeSince: moment().format()
    }

    musiciens.set(jsonObj.uuid, musicien);

})


var tcpSocket = net.createServer();

tcpSocket.listen(2205, console.log("TCP running"));

tcpSocket.on('connection', function( client ) {
    console.log("Connection établie");

    musiciens.forEach((value, key) => {
        if(moment().diff(value.activeSince, 'seconds') >= 5) {
            musiciens.delete(key);        
        }
    });

    client.write(JSON.stringify(Array.from(musiciens.values())));

    client.destroy();
    
});


function getInstru( sound ) {
    if (sound in instrumentFromSound) {
        return instrumentFromSound[sound];
    } else {
        return null;
    }
}
