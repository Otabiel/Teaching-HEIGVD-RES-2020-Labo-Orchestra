var instruments = new Map();
instruments.set("piano", "ti-ta-ti");
instruments.set("trumpet", "pouet");
instruments.set("flute", "trulu");
instruments.set("violin", "gzi-gzi");
instruments.set("drum", "boum-boum");
var sounds = new Map(Array.from(instrumentsList, i => i.reverse()));

module.exports.INSTRUMENTS = instruments;
module.exports.SOUNDS = sounds;
exports.IP_MULTICAST = "239.255.22.5";
exports.PORT = 2205;
exports.TIMEOUT = 5; // seconds
exports.INTERVAL = 1000; // milliseconds
