var React = require('react');

var Image = (props) => <div>IMAGE: {JSON.stringify(props.data)}</div>;

module.exports = (props) => <div className='grid mx3'>
  {props.images.map(img => <Image key={img.src} data={img} />)}
</div>;

