var xhr = require('xhr');

var apiUser = require('./user');
var apiImages = require('./images');

module.exports = function(opts, cb) {
  apiUser.load(function(err, user) {
    if (err) return cb(err);
    opts.user = user || null;
    if (opts.user !== null) apiImages.config(null, null, opts.user.token);
    loadData(opts, function(err, data) {
      if (err) return cb(err);
      loadImages(data, cb);
    });
  });
};

function loadData(opts, cb) {
  var ts = opts.user ? `?access_token=${opts.user.token}` : '';
  xhr(
    {
      uri: `https://api.github.com/repos/${opts.repo}/contents/${opts.config}${ts}`,
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
  apiImages.config(opts.repo, opts.configData.images)
  apiImages.loadRaw(function(err, images) {
    if (err) cb(err);
    opts.images = images;
    cb(null, opts);
  });
}
