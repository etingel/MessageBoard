var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    var queryString = "ALTER TABLE posts " +
                         "ADD CONSTRAINT \"posts_threadid_fkey\" " +
                             "FOREIGN KEY (threadid) " +
                             "REFERENCES threads(id) " +
                             "ON DELETE CASCADE;";
    db.runSql(queryString, callback);
};

exports.down = function(db, callback) {
    var queryString = "ALTER TABLE posts " +
                         "DROP CONSTRAINT posts_threadid_fkey;";

    db.runSql(queryString, callback);
};
