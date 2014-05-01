var Q = require("q");
var db = require("../database/index");
var errorResponse = require("./responses").errorResponse;

exports.threadIndex = function(req, res){
    db.getThreads()
    .then(function (threads) {
        res.render('threadIndex', {threads: threads});
    })
    .fail(function (error) {
        errorResponse(error, res);
    });
};

exports.thread = function(req, res){
    res.render('threadIndex', { title: 'Express' });
};
