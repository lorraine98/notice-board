const { MongoClient } = require("mongodb");

const uri = "localhost:27017";

module.exports = function (callback) {
  return MongoClient.connect(uri, callback);
};
