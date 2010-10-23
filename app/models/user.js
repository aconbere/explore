var Entity = require("./entity").Entity;

var User = function () {
  Entity.call(this, arguments);
};
User.prototype = new Entity();

