var Q = require("q");
var runQuery = require("./runQuery").runQuery;


var getPosts = function (data) {
    var threadid = data['threadid'];
    logger.info("Getting posts from database for threadid", threadid);

    runQuery("SELECT subject FROM threads WHERE id=$1", [threadid])
    .then(function (res) {
        if(res.rowCount == 0) {
            // thread doesn't exist, throw 404
            logger.error("Attempted to get posts for non-existent threadid");
            var err = Error();
            err['httpStatus'] = 404;
            err['httpResponse'] = "404 Not Found";
            err['friendlyName'] = "Tried to get posts for non-existent threadid";
            throw err;
        }
        var threadSubject = results.rows[0].subject;
        var postsQueryString = 'SELECT posts.id AS postid, posts.body \
                               FROM threads \
                                   INNER JOIN posts ON threads.id = posts.threadid AND threads.id = $1 \
                               ORDER BY posts.id;';
        return runQuery(postsQueryString, [threadid])
        .then(function (results) {
            var posts = results.rows;
            logger.info("Got posts from database for threadid", threadid);
            return {subject: threadSubject, posts: posts};
        });
};


exports.getPosts = getPosts;
