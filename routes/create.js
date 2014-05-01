var Q = require("q");
var db = require("../database/index");
var errorResponse = require("./responses").errorResponse;
var POSTSuccessResponse = require("./responses").POSTSuccessResponse;

exports.thread = function(req, res){
    var data = req.body;
    if (data["subject"] === undefined) {
        logger.error("No subject provided", data);
        var err = Error();
        err['httpStatus'] = 400;
        err['httpResponse'] = "400 Bad Request";
        err['friendlyName'] = "Did not provide subject";
        errorResponse(err, res);
        return;
    }
    if (data["body"] === undefined) {
        logger.error("No body provided", data);
        var err = Error();
        err['httpStatus'] = 400;
        err['httpResponse'] = "400 Bad Request";
        err['friendlyName'] = "Did not provide body";
        errorResponse(err, res);
        return;
    }
    db.addThread({subject: data["subject"]})
    .then(function (threaddata) {
        return db.addPost({threadid: threaddata.threadid, body: data["body"]})
        .then(function (postdata) {
            POSTSuccessResponse("/viewthread?threadid=" + threaddata.threadid, res);
        })
        .fail(function (error) {
            throw error;
        });
    })
    .fail(function (error) {
        errorResponse(error, res);
    });
};

exports.post = function(req, res){
    var data = req.body;
    if (data["body"] === undefined) {
        logger.error("No body provided", data);
        var err = Error();
        err['httpStatus'] = 400;
        err['httpResponse'] = "400 Bad Request";
        err['friendlyName'] = "Did not provide body";
        errorResponse(err, res);
        return;
    }
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
    db.addPost({threadid: threadid, body: data["body"]})
    .then(function (postdata) {
        POSTSuccessResponse("/viewthread?threadid=" + threadid, res);
    })
    .fail(function (error) {
        errorResponse(error, res);
    });
};
