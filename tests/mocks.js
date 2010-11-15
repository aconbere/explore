var sys = require("sys");
GameMock = function () {
  this.user = 10;
  this.GAIA = 11;
  this.entities = {};
};
GameMock.prototype.register = function (entity) {
  this.entities[entity.guid] = entity;
  sys.puts(sys.inspect(this.entities));
};


exports.GameMock = GameMock;

