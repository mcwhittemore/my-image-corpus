var xhr = require('xhr');

var api = module.exports = {};

var repo = null;
var file = null;
var token = null;

api.config = function(r, f, t) {
  repo = r || repo;
  file = f || file;
  token = t || token;
};

api.add = function(img, cb) {
  if (repo === null) setTimeout(() => cb(new Error('Not configured')));
  api.load(function(err, about) {
    if (err) return cb(err);
    var images;
    try {
      images = JSON.parse(atob(about.content));
    }
    catch(err) {
      return cb(err);
    }
    var m = images.filter(i => i.src === img.src);
    if (m.length) return cb(new Error('Image is already in the database'));
    images = [img].concat(images);
    xhr(
        {
          uri: `https://api.github.com/repos/${repo}/contents/${file}?access_token=${token}`,
          method: 'PUT',
          json: { message: `adding ${img.src} to the database`,
            content: btoa(JSON.stringify(images, null, 2)),
            sha: about.sha
          }
        },
        function(err, resp, body) {
          if (err) return cb(err);
          if (typeof body === 'string') body = JSON.parse(body);
          if (resp.statusCode >= 400) return cb(new Error(body.message));
          cb(null, images);
        }
    )
    
  });
};

api.loadRaw = function(cb) {
  if (repo === null) setTimeout(() => cb(new Error('Not configured')));
  xhr(
    {
      uri: `https://api.github.com/repos/${repo}/contents/${file}`,
      headers: {
        accept: 'application/vnd.github.VERSION.raw'
      }
    },
    function(err, resp, body) {
      if (err) return cb(err);
      cb(null, JSON.parse(body));
    }
  );
}

api.load = function(cb) {
  if (repo === null) setTimeout(() => cb(new Error('Not configured')));
  xhr(
    {
      uri: `https://api.github.com/repos/${repo}/contents/${file}`,
      headers: {
        accept: 'application/json'
      }
    },
    function(err, resp, body) {
      if (err) return cb(err);
      cb(null, JSON.parse(body));
    }
  );
}


