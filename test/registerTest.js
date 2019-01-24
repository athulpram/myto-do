const assert = require("assert");
const { handleSignup } = require("../src/register");

const cachedData = {};
const storeUserDetails = function (data) {
  cachedData.users = data;
}

const res = {
  content: undefined,
  write: function (content) {
    this.content = content;
  },
  statusCode: undefined,
  statusMessage: undefined
};

const req = {
  on: function (event, callback) {
    callback();
  },
  body: undefined,
  url: undefined
};


describe('handleSignup', function () {
  it('should change the state of cached data with new user details', function () {
    req.body = "firstName=swapnil&lastName=lothe&username=swapy&password=password";
    res.end = () => {
      const expectedOutput = `{"swapy":{"firstName":"swapnil","lastName":"lothe","username":"swapy","password":"password"}}`;
      const actualOutput = cachedData.users;
      assert.deepEqual(actualOutput, expectedOutput);
    }
    handleSignup(storeUserDetails, { users: {} }, req, res);
  });
});
