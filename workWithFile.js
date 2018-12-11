// usage: node workWithFile.js 3000

const http = require("http");
const fs = require("fs");

const path = "./files/secretTextHere.txt";

if (process.argv.length !== 3) {
  console.error(new Error("Need more params!"));
  process.exit(1);
}

var port = process.argv[2];

http
  .createServer((req, res) => {
    if (req.method !== "GET") {
      return res.end("method should be GET\n");
    }

    // var file = fs.readFileSync(path, "utf8");
    fs.readFile(path, (err, data) => {
      if (err) {
        console.error(err);
      }

      console.info("fs.readFile");
      res.writeHeader(200, { "Content-type": "text/plain" });
      res.end(data);
    });
  })
  .listen(port);
