var net = require('net');
var dgram = require('dgram');
var moment = require('moment');

var musiciens = new Map();

var socket = dgram.createSocket('udp4');

const instrumentFromSound = {
   'ti-ta-ti': 'piano',
   pouet: 'trumpet',
   trulu: 'flute',
   'gzi-gzi': 'violin',
   'boum-boum': 'drum'
};

socket.bind(60491, function() {
    console.log("Écoute sur le port : 60491");
    socket.addMembership('255.255.255.255');
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


var tcpSocket = new.createServer();

tcpSocket.listen(60491, console.log("TCP running"));

tcpSocket.on('connection', function( client ) {
    console.log("Connection établie");

    musiciens.forEach((value, key) => {
        if(moment().diff(value.activeSince, 'seconds') >= 5) {
            musiciens.delete(key);        
        }
    });

    console.log("Data send : " + JSON.stringify(Array.from(musiciens.values())));
    client.write(Buffer.from(JSON.stringify(Array.from(musicians.values()))));

    client.destroy();
    
});


function getInstru( sound ) {
    if (sound in instrumentFromSound) {
        return instrumentFromSound[sound];
    } else {
        return null;
    }
}
