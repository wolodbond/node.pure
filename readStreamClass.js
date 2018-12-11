// node readStreamClass.js

const { Readable } = require("stream");

const peaks = ["One", "two", "three"];

class StreamFromArray extends Readable {
  constructor(array) {
    //  super({ objectMode: true });
    super({ encoding: "UTF-8" });
    this.array = array;
    this.index = 0;
  }

  _read() {
    if (this.index <= this.array.length) {
      // for objects
      /* const chunk = {
        data: this.array[this.index],
        index: this.index
      };*/
      // for strings
      const chunk = this.array[this.index];

      this.push(chunk);
      this.index += 1;
    } else {
      this.push(null);
    }
  }
}

const peakStream = new StreamFromArray(peaks);

peakStream.on("data", chunk => console.log(chunk));

peakStream.on("end", chunk => console.log("done!"));
