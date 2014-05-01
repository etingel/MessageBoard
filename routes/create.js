var Q = require("q");
var db = require("../database");
var errorResponse = require("./responses").errorResponse

exports.thread = function(req, res){
  res.send("respond with a resource");
};

exports.post = function(req, res){
  res.send("respond with a resource");
};
