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
        console.info('server: led is on. make sure page is updated');
        io.emit('servLEDevent_on');
    } else if (led.readSync() === 1){
    	// this is not needed, because states are updated across all screens
    	console.info('server: led is on. make sure page is updated');
        io.emit('servLEDevent_off');
    }

    // When there's a push on a button
    socket.on('LEDevent_activate', function(){
    	console.info('server: received command to turn on led. Doing that!');
        led.writeSync(0); // on
        io.emit('servLEDevent_on');
    });
    socket.on('LEDevent_deactivate', function(){
    	console.info('server: received command to turn off led. Doing that!');
        led.writeSync(1); // off
        io.emit('servLEDevent_off');
    });
});

http.listen(3000, function(){
    console.log('throwing you a webpage on *:3000!');
});