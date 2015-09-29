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
        console.log('connected: led is on');

        // send the state to the webpage since it doesn't know yet
        socket.emit('servLEDevent_on');
    } else if (led.readSync() === 1){
        console.log('connected: led is off');
        socket.emit('LEDevent_off');
    }

    // When there's a push on a button
    socket.on('LEDevent_on', function(){
        led.writeSync(0);
        io.emit('servLEDevent_on');
    });
    socket.on('LEDevent_off', function(){
        led.writeSync(1);
        io.emit('servLEDevent_off');
    });
});

http.listen(3000, function(){
    console.log('throwing you a webpage on *:3000!');
});