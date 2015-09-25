var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// require onoff and set relay command pin
var Gpio = require('onoff').Gpio,
    led = new Gpio(17, 'out');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    // check if LED is on or off, log it's state
	if(led.readSync() === 0){
		console.log('led is on');
	} else if (led.readSync() === 1){
		console.log('led is off');
	}

	// When there's a push on a button
	socket.on('LEDevent_on', function(){
		console.log('LED on!');
		led.writeSync(0);
		// socket.emit('LEDevent_on', 'blabla');
	});
	socket.on('LEDevent_off', function(){
		console.log('LED off!');
		led.writeSync(1);
		// socket.emit('LEDevent_off', 'blabla');
	});
});

http.listen(3000, function(){
	console.log('throwing you a webpage on *:3000!');
});