var vows = require("vows")
  , assert = require("assert")
  , Vector = require("../../app/lib/vector").Vector
  
var express = require("express");
var http = require('http');

var exploreApp = http.createClient(3030, "localhost");

var api = {
  get: function (path, data) {
    return function () {
      var that = this;
      var gameReq = exploreApp.request('GET', path);
      gameReq.on("response", function (response) {
        var data = "";

        response.on("data", function (chunk) {
          data += chunk;
        });
        
        response.on("end", function () {
          that.callback(response, JSON.parse(data));          
        })
      });
      gameReq.end()
    }
  }
}

var suite = vows.describe("Entity");

suite.addBatch({
  "A Running Explore Server": {
    "using our api": {
      topic: api.get("/game"),
      "should respond with a 200": function (res, data) {
        assert.equal(res.statusCode, "200 ")
      }
    }
  }
}).run();

