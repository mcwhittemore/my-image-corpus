var ReactDOM = require('react-dom');
var React = require('react');
 
var ImageCorpusApp = require('./image-corpus-app');
 
ReactDOM.render(
  <ImageCorpusApp repo='mcwhittemore/pastoral' config='config.json' />,
  document.getElementById('app')
);
