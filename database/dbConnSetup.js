// this should be used anytime we need to connect to the DB
var dbUser = process.env.MESSAGEBOARD_DATABASE_USER;
if (!dbUser)
    dbUser = "messageboard";
// if it's set in the environment, use that password. Otherwise, use "onlyfordev"
var dbPassword = process.env.MESSAGEBOARD_DATABASE_PASSWORD;
if (!dbPassword)
    dbPassword = "onlyfordev";
var dbHost = process.env.MESSAGEBOARD_DATABASE_HOST;
if (!dbHost)
    dbHost = "localhost";
var dbDatabase = process.env.MESSAGEBOARD_DATABASE_DATABASE;
if (!dbDatabase)
    dbDatabase = "messageboard";

exports.CONNSTRING = "postgres://" + dbUser + ":" + dbPassword + "@" + dbHost + "/" + dbDatabase;


exports.dbUser = dbUser;
exports.dbPassword = dbPassword;
exports.dbHost = dbHost;
exports.dbDatabase = dbDatabase;

