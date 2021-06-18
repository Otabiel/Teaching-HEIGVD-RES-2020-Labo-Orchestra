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

const instrument = process.argv[2];
const sound = getSound(instrument);


if( sound == null) {
    console.log("Instrument invalide");
    process.exit(1);
}

const id = uuidv4();


const toJson = {
        uuid: id,
        sound: sound   
}

const message = JSON.stringify(toJson);

setInterval(() => play(id, sound), 1000);

function play (id, sound) {
    socket.send(message, 0, message.length, 9907, '239.255.22.5', console.log("Data send : " + message));
}

function getSound( instrument ) {
    if (instrument in soundFromInstrument) {
        return soundFromInstrument[instrument];
    } else {
        return null;
    }
}
