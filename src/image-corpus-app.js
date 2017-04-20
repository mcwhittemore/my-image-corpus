var React = require('react');

var Loading = require('./loading');
var User = (props) => <div>USER: {JSON.stringify(props)}</div>;
var Images = (props) => <div>IMAGES: {JSON.stringify(props)}</div>;

var loadData = require('./api/load');

class ImageCorpusApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      images: [],
      config: null,
      user: null,
      error: null
    };
  }
  dataLoaded(err, opts) {
    if (err) return this.setState({ loaded: true, error: err.message });
    this.setState({
      loaded: true,
      config: opts.configData,
      images: opts.images
    });
  }
  componentDidMount() {
    loadData(
      { repo: this.props.repo, config: this.props.config },
      this.dataLoaded.bind(this)
    );
  }
  setUser(data) {
    this.setState({ user: data });
  }
  addImage(data) {
    var imgs = [data].concat(this.state.images);
    this.setState({ images: imgs });
  }
  render() {
    if (this.state.loaded === false) return <Loading />;
    var config = this.state.config;
    return (
      <div className='m0 grid grid--gut12'>
        <div className='col--12 prose'>
          <h1>{config.name}</h1>
          <p>{config.description}</p>
          <User user={this.state.user} update={this.setUser} />
        </div>
        <Images images={this.state.images} add={this.addImage} canAdd={this.state.user !== null} />
      </div>
    );
  }
}

module.exports = ImageCorpusApp;
