import _progress from 'cli-progress';

// EXAMPLE 2 ---------------------------------------------
console.log('\nExample 2 - Custom configuration');

// create new progress bar using default values
const b2 = new _progress.Bar({
  barCompleteChar: '*',
  barIncompleteChar: '-',
  format: 'Current Upload Progress: [{bar}] {percentage}%',
  fps: 15,
  // stream: process.stdout,
  barsize: 40
});

b2.start(500, 0);

// 50ms update rate
const timer = setInterval(function () {
  // increment value
  b2.increment();

  // set limit
  if (b2.value >= b2.getTotal()) {
    // stop timer
    clearInterval(timer);

    b2.stop();

  }
}, 50);