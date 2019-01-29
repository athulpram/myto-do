const User = require("./../src/user");
const assert = require("assert");

describe("User", () => {
  it("should create a instance of user class with proper methods ", () => {
    let pram = new User({
      username: "pram",
      password: "something",
      firstName: "athul",
      lastName: "athul",
      toDoLists: {
        "0": {
          id: 0,
          title: "fadsdsf",
          desc: "sdffsdg",
          items: { "1": { id: 1, desc: "sdafdsf", isDone: true } }
        }
      }
    });
    assert.equal(pram.getFirstName(), "athul");
    assert.equal(pram.isValidPassword("something"), true);
  });
});
