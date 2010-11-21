var sys = require("sys");

GameMock = function () {
  this.user = 10;
  this.GAIA = 11;
  this.entities = {};
};

GameMock.prototype.register = function (entity) {
  this.entities[entity.guid] = entity;
};


exports.GameMock = GameMock;

