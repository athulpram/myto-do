const { initializeServer, requestHandler } = require("./../src/app.js");
const assert = require("assert");

const files = {
  "./public/index.html": "This is index.html",
  "./private/userData.json": `{"pram":{"username":"pram","password":"something","firstName":"athul","lastName":"athul"}}`
};

const dummyFs = {
  readFileSync: function(filePath) {
    return files[filePath];
  },
  readdirSync: function(directory) {
    return ["index.html"];
  }
};

const res = {
  content: undefined,
  write: function(content) {
    this.content = content;
  },
  setHeader: (key, val) => {
    res[key] = val;
  },
  statusCode: undefined,
  statusMessage: undefined
};

const req = {
  on: function(event, callback) {
    callback();
  },
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
    req.url = "/";
    requestHandler(req, res);
    res.end();
  });

  it("should change the response on res.end give 404", () => {
    res.end = function() {
      assert.equal(res.content, "file not found");
      assert.equal(res.statusCode, 404);
      assert.equal(res.statusMessage, "error");
    };
    initializeServer(dummyFs);
    req.url = "/invalidURL";
    requestHandler(req, res);
    res.end();
  });
});
