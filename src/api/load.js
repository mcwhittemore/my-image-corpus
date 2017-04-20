var xhr = require('xhr');

var userApi = require('./user');

module.exports = function(opts, cb) {
  userApi.load(function(err, user) {
    if (err) return cb(err);
    opts.user = user || null;
    loadData(opts, function(err, data) {
      if (err) return cb(err);
      loadImages(data, cb);
    });
  });
};

function loadData(opts, cb) {
  xhr(
    {
      uri: `https://api.github.com/repos/${opts.repo}/contents/${opts.config}`,
      headers: {
        accept: 'application/vnd.github.VERSION.raw'
      }
    },
    function(err, resp, body) {
      if (err) return cb(err);
      var config = JSON.parse(body);
      opts.configData = config;
      cb(null, opts);
    }
  );
}

function loadImages(opts, cb) {
  xhr(
    {
      uri: `https://api.github.com/repos/${opts.repo}/contents/${opts.configData.images}`,
      headers: {
        accept: 'application/vnd.github.VERSION.raw'
      }
    },
    function(err, resp, body) {
      if (err) return cb(err);
      opts.images = JSON.parse(body);
      cb(null, opts);
    }
  );
}
