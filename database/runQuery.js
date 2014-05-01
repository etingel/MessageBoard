var Q = require("q");
var pg = require("pg"); // PostgreSQL client library
var CONNSTRING = require("./dbConnSetup").CONNSTRING;


var runQuery = function (queryString, values) {
    var deferred = Q.defer();
    pg.connect(CONNSTRING, function (err, client, done) {
        if (err) {
            err["friendlyName"] = "Database connection error";
            err['httpStatus'] = 500;
            err['httpResponse'] = "500 Internal Server Error";
            logger.error("Database connection error in runQuery", err);
            deferred.reject(err);
        }

        else {
            client.query(queryString, values, function (err, results) {
                done(); // called to release the connection client into the pool
                if (err) {
                    err["friendlyName"] = "Query error";
                    err['httpStatus'] = 500;
                    err['httpResponse'] = "500 Internal Server Error";
                    logger.error("Query error in runQuery", err);
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(results);
                }
            });
        }
    });
    return deferred.promise;
};

exports.runQuery = runQuery;
