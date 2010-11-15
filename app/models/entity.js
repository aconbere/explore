var GUID = require("./guid").GUID
  , sys = require("sys")

var Entity = function (game, guid) {
  // only does its business if game is passed in
  // this allows us to use Entity as a prototype constructor
  this.guid = guid || GUID();
  this.register(game);
  this.type = "entity";
};

Entity.prototype.update = function () {
  if (this.pendingAction) {
    this[this.pendingAction.action].call(this, this.pendingAction.args);
  }
};

Entity.prototype.register = function (game) {
  if (game) {
    this.game = game;
    this.game.register(this);
  } else {
  }
};

Entity.prototype.serialize = function () {
  var output = { "guid": this.guid
               , "type": this.type
               }
  return output;
};

exports.Entity = Entity;
