// node transformStream.js ./files/secretTextHere.txt <fs || stdout>
// node transformStream.js ./files/secretTextHere.txt stdout

const http = require("http");
const fs = require("fs");
const through = require("through2");

if (process.argv.length !== 4) {
  errorHandler();
}

function errorHandler() {
  console.warn("U forgot something!");
  process.exit(0);
}

const path = process.argv[2];
const readFile = fs.createReadStream(path);

const stream = through(write, end);

function write(buffer, encoding, next) {
  let text = buffer.toString();
  text = text.replace(/read/gi, "write");
  this.push(text);
  next();
}

function end(done) {
  process.exit(0);
  done();
}

var output = process.argv[3];

if (output === "stdout") {
  process.stdin
    .pipe(readFile)
    .pipe(stream)
    .pipe(process.stdout);
} else if (output === "fs") {
  const outputFile = fs.createWriteStream(__dirname + "/files/output.txt");
  process.stdin
    .pipe(readFile)
    .pipe(stream)
    .pipe(outputFile);
} else {
  errorHandler();
}
