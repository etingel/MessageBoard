var Q = require("q");
var runQuery = require("./runQuery").runQuery;

/*
curl -d "subject=An%20Awesome%20Topic" http://localhost:3000/createthread
 */


var addThread = function(data) {
    var subject = data['subject'];

    runQuery("INSERT INTO threads(subject) VALUES($1) RETURNING *", [subject])
    .then(function (results) {
        var tid = results.rows[0].id;
        return {'threadid':tid}; // pass back the thread id so that a post can be added and the page can be redirected to the new thread
    });
};

exports.addThread = addThread;
