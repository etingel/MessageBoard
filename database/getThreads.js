var Q = require("q");
var runQuery = require("./runQuery").runQuery;


var getThreads = function (data) {
    logger.info("Getting threads from database");

    runQuery("SELECT * FROM threads;", [])
    .then(function (results) {
        logger.info("Got threads from database");
        return results.rows;
    });
};


exports.getThreads = getThreads;
