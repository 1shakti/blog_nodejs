const mongoose = require("mongoose");

function mongoDBConnect(url) {
  return mongoose.connect(url);
}

module.exports = {
  mongoDBConnect,
};
