const EventEmitter = require('events');
const eventEmitter = new EventEmitter();


//Atrelar eventos customizados
eventEmitter.on('start', () => {
  console.log('Durante')
});

console.log('Antes');

eventEmitter.emit('start');

console.log('Depois')