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
    var data = req.query;
    if (data["threadid"] === undefined || isNaN(parseInt(data["threadid"]))) {
        logger.error("Invalid threadid:", data["threadid"]);
        var err = Error();
        err['httpStatus'] = 400;
        err['httpResponse'] = "400 Bad Request";
        err['friendlyName'] = "Did not provide valid threadid";
        errorResponse(err, res);
        return;
    }
    threadid = parseInt(data["threadid"]);
    db.getPosts({threadid: threadid})
    .then(function (postdata) {
        postdata["threadid"] = threadid;
        res.render('thread', postdata);
    })
    .fail(function (error) {
        errorResponse(error, res);
    });
};
