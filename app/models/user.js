var Entity = require("./entity").Entity;

var User = function () {
  Entity.apply(this, arguments);
};
User.GAIA = new User();
User.prototype = new Entity();

exports.User = User;
