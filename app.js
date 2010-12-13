var express = require("express");
var Game = require("./app/models/game").Game

var game = new Game.randomMap(100, 30);
var app = express.createServer();
app.use(express.bodyDecoder());

app.get("/", function (req, res) {
  res.send("Welcome to \"explore\"");
});

app.get("/game", function (req, res) {
  console.log("game request")
  res.send(JSON.stringify(game.serialize()));
});

app.get("/game/entities", function (req, res) {

  res.send(JSON.stringify(game.entityValues().map(function (e) {
    return e.serialize();
  })));
});

app.post("/game/tick", function (req, res) {
  game.tick();
  res.send(JSON.stringify(game.serialize()));
});

app.get("/entity/pending/:id", function (req, res) {
  res.send(JSON.stringify(game.getEntity(req.params.id).pendingAction) || "None");
});

app.get("/entity/:id", function (req, res) {
  console.log("entitiy request: " + req.params.id)
  res.send(JSON.stringify(game.getEntity(req.params.id).serialize()));
});

app.get("/entity/:id/los", function (req, res) {
  res.send(JSON.stringify(game.getLOS(req.params.id).map(function (e) {
    return e.serialize();
  })));
});

app.post("/entity/:id/:action", function (req, res) {
  var result = game.dispatch(
                { entity: req.params.id
                , action: req.params.action
                , args: req.body.items || []
                });
  res.send(JSON.stringify(result));
});

app.listen(3030);
