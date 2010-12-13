var vows = require("vows")
  , assert = require("assert")
  , Vector = require("../../app/lib/vector").Vector
  
var express = require("express");
var http = require('http');

var exploreApp = http.createClient(3030, "localhost");

var apiFactory = function (method, path, query) {
  return function () {
    var that = this;
    var gameReq = exploreApp.request(method, path);
    gameReq.on("response", function (response) {
      var data = "";

      response.on("data", function (chunk) {
        data += chunk;
      });
        
      response.on("end", function () {
        that.callback(null, {res: response, data: JSON.parse(data)});      
      })
    });
    gameReq.end()
  }
}
var api = {
  get: function (path, query) {
    return apiFactory("GET", path, query)
  },
  
  post: function (path, query) {
    return apiFactory("POST", path, query)
  },
  
  getEntity: function (id) {
    return apiFactory("GET", "/entity" + id)
  }
}

var suite = vows.describe("Entity");

suite.addBatch({
  "A Running Explore Server": {
    "a request for game state": {
      topic: api.get("/game"),
      "should respond with a 200": function (err, res) {
        assert.equal(res.res.statusCode, "200 ")
      },
      
      "should have type, total, worldSize, turn values": function (err, res) {
        ["type", "total", "worldSize", "turn"].forEach(function (k) {
          assert.notEqual(res.data[k], undefined)
        })
      }
    },
    
    "a request for game entities": {
      topic: api.get("/game/entities"),
      "should respond with a 200": function (err, res) {
        assert.equal(res.res.statusCode, "200");
      },
      
      "should return the initial list of game entities": function (err, res) {
        assert.equal(res.data.length, 32);
        assert.equal(res.data.filter(function (e) { return e.type == "user"}).length, 2)
        assert.equal(res.data.filter(function (e) { return e.type == "planet"}).length, 30)
      },
      
      "a request for individual entity data": {
        topic: api.get("/entitiy/" + 7)
        "should blah": function (err, res) {
          console.log()
        }
        
      }
    },
    
    "a request for entity data": {
      
    }
  }
}).run();

