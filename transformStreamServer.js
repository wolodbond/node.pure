// node streamsServer.js <port>
// node transformStreamServer.js 3000
// send file via post request

const http = require("http");
const map = require("through2-map");

if (process.argv.length !== 3) {
  console.error(new Error("Port number is required!"));
  process.exit(1);
}

const port = process.argv[2];

var server = http
  .createServer((req, res) => {
    if (req.method !== "POST") {
      return res.end("method should be POST\n");
    }

    req
      .pipe(
        map(chunk => {
          let text = chunk.toString();
          text = text.replace(/read/gi, "write");

          return text;
        })
      )
      .pipe(res);

    req.on("error", err => {
      res.end(err);
    });
  })
  .listen(port);
