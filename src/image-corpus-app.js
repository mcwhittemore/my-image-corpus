var React = require('react');

var Message = require('./message');
var User = require('./user');
var Images = require('./images');

var loadData = require('./api/load');
var apiImages = require('./api/images');
var apiUser = require('./api/user');

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
      images: opts.images,
      user: opts.user,
      clearError: null
    });
  }
  componentDidMount() {
    loadData(
      { repo: this.props.repo, config: this.props.config },
      this.dataLoaded.bind(this)
    );

    var ce = setInterval(() => {
      if (this.state.error !== null) {
        this.setState({error: null});
      }
    }, 1000);

    this.setState({clearError:ce});
  }
  componentWillUnmount() {
    if (this.state.clearError) clearInterval(this.state.clearError);
  }
  setUser(data) {
    apiUser.save(data, (error) => {
      if (error) return this.setState({error});
      this.setState({ user: data });
    });
  }
  addImage(img) {
    apiImages.add(img, (error, imgs) => {
      if (error) return this.setState({error});
      this.setState({ images: imgs });
    });
  }
  render() {
    if (this.state.loaded === false) return <Message msg='Loading...' />;
    if (this.state.error !== null) return <Message msg={this.state.error.message} />;
    var config = this.state.config;
    return (
      <div className='m0'>
        <div className='grid prose bg-teal-light'>
          <div className='col--10'>
            <h1 className='m3'>{config.name}</h1>
            <p className='px6'>{config.description}</p>
          </div>
          <User user={this.state.user} update={this.setUser.bind(this)} add={this.addImage.bind(this)} />
        </div>
        <Images images={this.state.images} />
      </div>
    );
  }
}

module.exports = ImageCorpusApp;
