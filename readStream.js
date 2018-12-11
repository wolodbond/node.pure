// usage: node readStream.js <filePath>
// node readStream.js ./files/secretTextHere.txt

const fs = require("fs");

if (process.argv.length !== 3) {
  console.error(new Error("File path required as third param!"));
  process.exit(1);
}

const filepath = process.argv[2];

var readStream = fs.createReadStream(filepath);

readStream.on("data", chunk => {
  console.warn("readStream begin!");

  console.log("uuuuuuuu+++++++");

  console.info(chunk.toString());
  console.info(`${chunk.toString().length} chars read\n`);

  console.log("uuuuuuuu-------");
});

readStream.on("end", () => console.log("done!"));

readStream.on("error", error => console.error(error));

// stream on mode non-float mode. need hit the enter for get result
readStream.pause();

process.stdin.on("data", chunk => {
  readStream.read();
  var text = chunk.toString().trim();
  console.info("data:", text);
  if (text === "finish") {
    // for convert stream back into float mode
    // and in case of long file that splitted into a couple chunks it get to us rest of the chunks
    readStream.resume();
  }
});
