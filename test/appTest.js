const { initializeServer, requestHandler } = require("./../src/app.js");
const fs = require("fs");
const assert = require("assert");
const request = require("supertest");
initializeServer(fs);

describe.only("requestHandler", () => {
  describe("index.html", () => {
    it("should return status 200 and an html file", done => {
      request(requestHandler)
        .get("/")
        .expect("Content-Type", /html/)
        .expect(200)
        .end(done);
    });
    it("should return status 404 for page not found", done => {
      request(requestHandler)
        .get("/wrongurl")
        .expect(404)
        .end(done);
    });
    it("redirect to homepage for invalid username", function(done) {
      request(requestHandler)
        .post("/login")
        .send({ username: "username", password: "password" })
        .expect("location", "/index.html")
        .expect(302)
        .end(done);
    });
    it("redirect to homepage for loging out ", function(done) {
      request(requestHandler)
        .get("/logout")
        .expect("location", "/index.html")
        .expect(302)
        .end(done);
    });
  });
});
