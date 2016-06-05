/*
	Dooralarm.js
	Watches for changes on a Raspberry gpio pin. Useful for detecting all kinds of input, from buttons to custom sensors.
	More info can be found at http://www.tomhartwig.nl/blog/raspberry-pi-domotica-door-sensor/
*/

var Gpio = require('onoff').Gpio,
	button = new Gpio(4, 'in', 'both');

button.watch(function (err, value){
	if(err){
		throw err;
	}

	console.log('value:', value);
});

process.on('SIGINT', function(){
	button.unexport();
});