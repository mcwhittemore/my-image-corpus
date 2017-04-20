var xhr = require('xhr');

var api = module.exports = {};

api.save = function(data, cb) {
  var error = null;
  try {
    localStorage.setItem('user-token', data.token);
  } catch (err) {
    error = err;
  }
  setTimeout(function() {
    cb(error);
  });
};

api.load = function(cb) {
  var token = localStorage.getItem('user-token');
  if (token === null) {
    return setTimeout(() => cb(null, null));
  }

  api.getGithubUser(token, function(err, data) {
    if (err) return cb(err);
    cb(null, data);
  });
};

api.getGithubUser = function(token, cb) {
  xhr(
      {
        url: `https://api.github.com/user?access_token=${token}`
      },
      function(err, resp, body) {
        if (err) return cb(err);
        body = JSON.parse(body);
        if (resp.statusCode >= 400) return cb(new Error(body.message));
        cb(null, {
          avatar: body.avatar_url,
          login: body.login,
          token: token
        });
      }
  );
};

/*
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
*/

