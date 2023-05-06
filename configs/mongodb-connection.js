const { MongoClient } = require("mongodb");

const { MONGODB_URI } = process.env;

module.exports = function (callback) {
  return MongoClient.connect(MONGODB_URI, callback);
};
