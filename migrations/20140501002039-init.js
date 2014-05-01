var dbm = require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function (db, callback) {
  async.series([
    db.createTable.bind(db, 'threads', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      subject: 'text'
    }),
    db.createTable.bind(db, 'posts', {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      threadid: 'int',
      body: 'text'
    })
  ], callback);
};

exports.down = function (db, callback) {
  async.series([
    db.dropTable.bind(db, 'threads'),
    db.dropTable.bind(db, 'posts')
  ], callback);
};
