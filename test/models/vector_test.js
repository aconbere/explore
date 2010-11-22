var vows = require("vows")
  , assert = require("assert")
  , Vector = require("../../app/lib/vector").Vector

var suite = vows.describe("Vector");

suite.addBatch({
  "Vector": {
    "dot": {
      "cardinal unit vectors": {
        topic: function () {
          return { xv: new Vector(1, 0, 0)
                 , yv: new Vector(0, 1, 0)
                 , zv: new Vector(0, 0, 1)
                 }
        },

        "should have magnitude 1": function (topic) {
          assert.equal(Math.sqrt(topic.xv.dot(topic.xv)), 1);
          assert.equal(Math.sqrt(topic.yv.dot(topic.yv)), 1);
          assert.equal(Math.sqrt(topic.zv.dot(topic.zv)), 1);
        },

        "dotted with eachother should equal zero": function (topic) {
          assert.equal(topic.xv.dot(topic.yv), 0);
          assert.equal(topic.yv.dot(topic.zv), 0);
          assert.equal(topic.zv.dot(topic.xv), 0);
        }
      },
      "two random vectors": {
        topic: [ new Vector(2,3,5), new Vector(1, 4, 6) ],

        "dotted should equal 44": function (topic) {
          assert.equal(topic[0].dot(topic[1]), 44);
        }
      }
    },

    "cross": {
      "cardinal unit vectors": {
        topic: function () {
          return { xv: new Vector(1, 0, 0)
                 , yv: new Vector(0, 1, 0)
                 , zv: new Vector(0, 0, 1)
                 }
        },

        "x' crossed with y' should equal z'": function (topic) {
          assert.deepEqual(topic.xv.cross(topic.yv), topic.zv);
        },

        "A vector crossed with itself is a null vector": function (topic) {
          assert.deepEqual(topic.xv.cross(topic.xv), new Vector());
        }
      }
    },
    "multiply": {
    },

    "add": {
    }
  }
}).export(module);
