/*
 * Doing this allows routes, etc to only require /database instead of
 * each individual database module.
 */


exports.addPost = require("./addPost").addPost;
exports.addThread = require("./addThread").addThread;
exports.getPosts = require("./getPosts").getPosts;
exports.getThreads = require("./getThreads").getThreads;

