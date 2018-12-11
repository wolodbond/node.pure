// usage: node splitForReadStream.js
/*
const fs = require("fs");
const through = require("through2");
const split = require("split");

fs.createReadStream("files/secretTextHere.txt")
  .pipe(split())
  .pipe(
    through(function(chunk, _, next) {
      this.push(`---${chunk.toString()}---\n`);
      next();
    })
  )
  .pipe(process.stdout);

const through = require("through2");

const stream = through(function(chunk, encoding, next) {
  this.push("---" + chunk.toString() + "---");
  next();
});

readableStream.pipe(through).pipe(writeableStream);
*/
