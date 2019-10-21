const EventEmitter = require('events');

// Create a class
class MyEventEmitter extends EventEmitter { }

// Intitialize an object
const myEventEmitter = new MyEventEmitter();

// Event Listener
myEventEmitter.on('event', () => console.log('Event fired!'));

// Intitialize the event
myEventEmitter.emit('event');