var path = require('path');

module.exports = {
  mountFolder: function (connect, dir) {
    return connect.static(path.resolve(dir));
  }
};
