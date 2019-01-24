const { initializeServer, requestHandler } = require("./../src/app.js");
const assert = require("assert");

const files = {
  "./public/index.html": "This is index.html"
};

const dummyFs = {
  readFileSync: function(filePath) {
    return files[filePath];
  },
  readdirSync: function(directory) {
    return Object.keys(files).map(filePath => filePath.split("/")[2]);
  }
};

let res = {
  content: undefined,
  write: function(content) {
    this.content = content;
  },
  statusCode: undefined,
  statusMessage: undefined
};
let req = {
  url: undefined
};

describe("requestHandler", () => {
  it("should change the response on res.end", () => {
    res.end = function() {
      assert.equal(res.content, "This is index.html");
      assert.equal(res.statusCode, 200);
      assert.equal(res.statusMessage, "Ok");
    };
    initializeServer(dummyFs);
    requestHandler({ url: "/" }, res);
    res.end();
  });

  it("should change the response on res.end give 404", () => {
    res.end = function() {
      assert.equal(res.content, "file not found");
      assert.equal(res.statusCode, 404);
      assert.equal(res.statusMessage, "error");
    };
    initializeServer(dummyFs);
    requestHandler({ url: "/noFile" }, res);
    res.end();
  });
});
