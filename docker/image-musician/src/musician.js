//https://node.readthedocs.io/en/latest/api/dgram/
//https://www.geeksforgeeks.org/node-js-npm-uuid/
var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

const {v4 : uuidv4} = require('uuid');

const soundFromInstrument = {
   piano: 'ti-ta-ti',
   trumpet: 'pouet',
   flute: 'trulu',
   violin: 'gzi-gzi',
   drum: 'boum-boum'
};

const intrument = process.argv[2];
var sound;

if (instrument in soundFromInstrument) {
    sound = soundFromInstrument[instrument];
} else {
    sound = null;
}

if( sound == null) {
    console.log("Instrument invalide");
    process.exit(1);
}

const id = uuidv4();

setInterval(() => play(id, instrument, sound), 1000);


function play (id, sound) {

    const toJson = {
        uuid: id,
        sound: sound   
    }

    const message = JSON.stringify(toJson);

    socket.send(message, 0, message.length, 60491, 255.255.255.255, console.log("Data send : " + payload));

}


