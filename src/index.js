var ReactDOM = require('react-dom');
var React = require('react');

var ImageCorpusApp = require('./image-corpus-app');

var de = document.getElementById('app');

var repo = de.getAttribute('data-repo');
var config = de.getAttribute('data-config');

ReactDOM.render(
  <ImageCorpusApp repo={repo} config={config} />,
  de
);
