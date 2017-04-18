var React = require('react');

var Loading = require('./loading');


class ImageCorpusApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      images: [],
      config: null,
      accessToken: null
    };
  }
  componentDidMount() {
    
  }
  render() {
    if (this.state.loaded === false) return <Loading />;
    return <div>{this.props.repo}</div>;
  }
};

module.exports = ImageCorpusApp;
 
