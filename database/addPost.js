var Q = require("q");
var runQuery = require("./runQuery").runQuery;

/*
curl -d "threadid=1&body=an%20awesome%20message" http://localhost:3000/createpost
 */


var addPost = function(data) {
    var threadid = data['threadid'];
    var body = data['body'];
    runQuery("SELECT id FROM threads WHERE id=$1", [threadid])
    .then(function (res) {
        if(res.rowCount == 0) {
            // thread doesn't exist, throw 400
            logger.error("Attempted to add post for non-existent threadid");
            var err = Error();
            err['httpStatus'] = 400;
            err['httpResponse'] = "400 Bad Request";
            err['friendlyName'] = "Tried to add post for non-existent threadid";
            throw err;
        }
        return runQuery("INSERT INTO posts(threadid, body) VALUES($1, $2) RETURNING *", [threadid, body])
        .then(function (results) {
            var pid = results.rows[0].id;
            return {'postid':pid}; // success status, even though it isn't needed here
        });
    });
};

exports.addPost = addPost;
