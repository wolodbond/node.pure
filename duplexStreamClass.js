// without through2
// node duplexStreamClass.js ./files/storeSomething.txt

const { Duplex, PassThrough } = require("stream");
const { createWriteStream, createReadStream } = require("fs");

if (process.argv.length !== 3) {
  console.error(new Error("File path required as third param!"));
  process.exit(1);
}

const readStream = createReadStream("./files/secretTextHere.txt");

const filepath = process.argv[2];
const writeStream = createWriteStream(filepath);

/*
const report = new PassThrough();
readStream.pipe(report).pipe(writeStream);
*/

class Throttle extends Duplex {
  constructor(ms) {
    super();
    this.delay = ms;
  }

  _write(chunk, encoding, callback) {
    this.push(chunk);
    setTimeout(callback, this.delay);
  }

  _read() {}

  _final() {
    this.push(null);
  }
}

const report = new PassThrough();
const throttle = new Throttle(100);

var total = 0;
report.on("data", chunk => {
  total += chunk.length;
  console.log("bytes: ", total);
});

readStream
  .pipe(throttle)
  .pipe(report)
  .pipe(writeStream);
