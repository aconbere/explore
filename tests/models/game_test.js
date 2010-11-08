var minitest = require("minitest")
  , assert = require("assert")
  , sys = require("sys")
  , Game = require("../../app/models/game").Game;


minitest.context("Game#randomMap", function () { 
  this.assertion("Creat a random world", function (test) {
    var curGame = Game.randomMap(1000, 100);
    assert.equal(Object.keys(curGame.entities).length, 100);
    test.finished();
  });
});

