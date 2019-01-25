const assert = require("assert");
const { handleDashboard } = require("./../src/dashboard.js");

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
  headers: {
    cookie: ""
  },
  on: function(event, callback) {
    callback();
  },
  url: undefined
};

const cachedData = {
  publicFiles: {
    "./public/dashboard.html": "This is dashboard"
  },
  users: {
    swapy: {
      firstName: "swapnil",
      lastName: "lothe",
      username: "swapy",
      password: "password",
      getFirstName: function() {
        return this.firstName;
      }
    }
  }
};

describe("handledashboard", () => {
  it('should return a res with redirection to "/indexed.html"', () => {
    req.parsedCookie = {};
    req.url = "/dashboard";
    res.end = function() {
      assert.equal(res.statusCode, 302);
      assert.equal(res.location, "/index.html");
    };
    handleDashboard(cachedData, req, res);
  });

  it("should make res with content as dashboard", () => {
    req.parsedCookie = { username: "swapy" };
    req.url = "/dashboard";
    res.end = function() {
      assert.equal(res.statusCode, 200);
      assert.equal(res.content, "This is dashboard");
    };
    handleDashboard(cachedData, req, res);
  });
});
