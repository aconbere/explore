var GUID = require("./guid").GUID;

var Entity = function (guid) {
  this.guid = guid || GUID();
  this.type = "entity";
};

Entity.prototype.update = function () {
  if (this.pendingAction) {
    this[this.pendingAction.action].call(this, this.pendingAction.args);
  }
};

Entity.prototype.serialize = function () {
  var output = { "guid": this.guid
               , "type": this.type
               }
  return output;
};

exports.Entity = Entity;
