var Entity = require("./entity").Entity

var User = function () {
  Entity.apply(this, arguments);
  this.type = "user"
};

User.prototype = new Entity();

exports.User = User;
