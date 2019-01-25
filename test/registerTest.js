const assert = require("assert");
const { handleSignup, handleLogin, handleLogout } = require("../src/register");

const cachedData = {};
const storeUserDetails = function(data) {
  cachedData.users = data;
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
  body: undefined,
  url: undefined
};

describe("handleSignup", function() {
  it("should change the state of cached data with new user details", function() {
    req.body =
      "firstName=swapnil&lastName=lothe&username=swapy&password=password";
    res.end = () => {
      const expectedOutput = `{"swapy":{"username":"swapy","password":"password","firstName":"swapnil","lastName":"lothe"}}`;
      const actualOutput = cachedData.users;
      assert.deepEqual(actualOutput, expectedOutput);
    };
    handleSignup(storeUserDetails, { users: {} }, req, res);
  });
});

describe("handleLogin", function() {
  it("should return a response with cookie for a valid login", function() {
    cachedData.users = {
      pram: {
        username: "pram",
        password: "something",
        firstName: "athul",
        lastName: "athul",
        isValidPassword: function(password) {
          return this.password == password;
        }
      }
    };

    res.end = () => {
      assert.deepEqual(res["Set-Cookie"], "username=pram");
    };
    req.body = `username=pram&password=something`;
    handleLogin(cachedData, req, res);
  });
});

describe("handleLogout", () => {
  it("should return a res with a expired cookie of username", () => {
    res.end = () => {
      assert.equal(
        res["Set-Cookie"],
        "username=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
      );
    };
    handleLogout(req, res);
  });
});
