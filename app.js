var express = require("express");
var Game = require("./app/models/game").Game

var game = new Game.randomMap(100, 30);
var app = express.createServer();
app.use(express.bodyDecoder());

app.get("/", function (req, res) {
  res.send("Welcome to \"explore\"");
});

app.get("/game", function (req, res) {
  res.send(JSON.stringify(game.serialize()));
});

app.get("/game/entities", function (req, res) {

  res.send(JSON.stringify(game.entityValues().map(function (e) {
    return e.serialize();
  })));
});

app.get("/game/tick", function (req, res) {
  game.tick();
  res.send(JSON.stringify(game.serialize()));
});

app.get("/entity/:id", function (req, res) {
  res.send(JSON.stringify(game.getEntity(req.params.id).serialize()));
});

app.get("/entity/:id/los", function (req, res) {
  res.send(JSON.stringify(game.getLOS(req.params.id).map(function (e) {
    return e.serialize();
  })));
});

app.get("/entity/:id/:action", function (req, res) {
  game.dispatch({ guid: req.params.id
                , action: req.params.action
                , args: req.body || []
                })
  res.send("true");
});

app.listen(3030);
