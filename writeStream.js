// usage: node readStream.js <filePath>
// node writeStream.js ./files/storeSomething.txt
// or by using unix tools for process.stdin.pipe :
// echo "write this to file" | node writeStream.js ./files/storeSomething.txt
// cat ./files/sercretTextHere.txt | node writeStream.js ./files/storeSomething.txt

const { createWriteStream, createReadStream } = require("fs");

if (process.argv.length !== 3) {
  console.error(new Error("File path required as third param!"));
  process.exit(1);
}

const readStream = createReadStream("./files/secretTextHere.txt");

const filepath = process.argv[2];
const writeStream = createWriteStream(filepath, {
  //highWaterMark: 20
});

// DO THIS
// pipe handle backpressure automatically
//readStream.pipe(writeStream).on("error", console.error);

// OR DO THIS

//process.stdin.pipe(writeStream);

// OR DO THIS

readStream.on("data", chunk => {
  const result = writeStream.write(chunk);
  if (!result) {
    console.log("overflow");
    readStream.pause();
  }
});

readStream.on("error", error => console.error(error.message));

readStream.on("end", () => {
  writeStream.write("\nhello, ");
  writeStream.end("world!");
});

writeStream.on("drain", () => {
  console.log("drain");
  readStream.resume();
});

writeStream.on("close", () => {
  process.stdout.write("file copied\n");
});
