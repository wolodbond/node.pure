// can using along with crypto or zlib packages
// node transformStreamClass.js

const { Transform } = require("stream");

class MutateText extends Transform {
  constructor(char) {
    super();
    this.mutationChar = char;
  }

  _transform(chunk, encode, callback) {
    const transformChunk = chunk
      .toString()
      .replace(/[a-z|[A-Z]/g, this.mutationChar);
    this.push(transformChunk);
    callback();
  }

  _flush(callback) {
    this.push("more data");
    callback();
  }
}

var transformStream = new MutateText("0");
process.stdin.pipe(transformStream).pipe(process.stdout);
