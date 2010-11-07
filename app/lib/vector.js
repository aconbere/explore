var sys = require("sys")

var Vector = function (x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0; 
    
};

Vector.random = function () {
  return new Vector(Math.random(), Math.random(), Math.random());
};

Vector.randomInt = function (max) {
  var randomInt = function () {
    return Math.floor(Math.random() * max);
  }; 

  return new Vector(randomInt(), randomInt(), randomInt());
};

Vector.prototype.dot = function (vector) {
  return (this.x * vector.x) + (this.y * vector.y) + (this.z * vector.z);
}

Vector.prototype.cross = function (vector) {
  var result = new Vector();

  result.x = (this.y * vector.z) - (this.z * vector.y);
  result.y = (this.z * vector.x) - (this.x * vector.z);
  result.z = (this.x * vector.y) - (this.y * vector.x);
  return result;
}

Vector.prototype.multiply = function (scaler) {
  var result = new Vector();

  result.x = this.x * scaler;
  result.y = this.y * scaler;
  result.z = this.z * scaler;
  return result;
}

Vector.prototype.add = function (vector) {
  var result = new Vector();

  result.x = this.x + vector.x;
  result.y = this.y + vector.y;
  result.z = this.z + vector.z;
  return result;
}

Vector.prototype.subtract = function (vector) {
  return this.add(vector.multiply(-1));
};

Vector.prototype.divide = function (scaler) {
  return this.multiply(1 / scaler);
};

Vector.prototype.magnitude = function () {
  return Math.sqrt(this.dot(this));
};

Vector.prototype.unit = function () {
  return this.divide(this.magnitude())
};   

Vector.prototype.equals = function (test) {
  return this.x == test.x && this.y == test.y && this.z == test.z;
};   

exports.Vector = Vector
