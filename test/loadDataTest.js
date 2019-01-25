const { loadFiles } = require("../src/loadData.js");
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

describe("loadFiles", () => {
  it("Should return object containing given file contents", () => {
    const actualOutput = loadFiles("./public", dummyFs);
    const expectedOutput = { "./public/index.html": "This is index.html" };
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
