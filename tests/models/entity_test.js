var minitest = require("minitest");
var assert = require("assert");

minitest.context("Entity", function () {
  this.assertion("should do something", function (test) {
    assert.ok(false);
    test.finished();
  });
});
