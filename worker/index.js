const keys = require('./keys');
const redis = require('redis');

//creates a redis client. 
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  // if connection is lost, will attempt to reconnect.
  retry_strategy: () => 1000,
});
const sub = redisClient.duplicate();

// function used for calculating fib values when given a specific index.
// THIS IS RECURSIVE AND NOT IDEAL
// using it to better simulate the use for a worker process. 
function fib(index) {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on('message', (channel, message) => {
  redisClient.hset('values', message, fib(parseInt(message)));
});
sub.subscribe('insert');
