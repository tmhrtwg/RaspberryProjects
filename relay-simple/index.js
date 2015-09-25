// require onoff and set relay command pin
var Gpio = require('onoff').Gpio,
    relayPin = new Gpio(17, 'out');

relayPin.writeSync(0); // Turn LED on!

// Stop blinking the LED and turn it off after 5 seconds.
setTimeout(function() {
    relayPin.writeSync(1);  // Turn LED off.
    relayPin.unexport();    // Unexport GPIO and free resources
}, 3000);