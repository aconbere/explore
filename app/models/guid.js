var GUID = function () {
  GUID.index = GUID.index + 1;
  this.index = GUID.index;
  return this.index;
};

GUID.index = 0;

exports.GUID = GUID;
