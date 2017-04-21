var React = require('react');

class Image extends React.Component {
  render() {
    var img = this.props.data;
    return <div className='m6 bg-gray-light p6 w240'>
      <img src={img.src} width='100%' />
      <div>
        {img.tags.map((t) => <div className='round-bold bg-green-light inline-block p3 m3'>{t}</div>)}
      </div>
    </div>;
  }
}

module.exports = (props) => <div className='grid mx3'>
  {props.images.map(img => <Image key={img.src} data={img} />)}
</div>;

