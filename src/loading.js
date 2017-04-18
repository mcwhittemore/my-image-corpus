var React = require('react');

module.exports = () => {
  return (
    <div className='grid grid--gut12 absolute top left bottom right'>
      <div className='col col--4'></div>
      <div className='col col--4 align-center relative' style={{top:'50%', height: '50%'}}>Loading...</div>
      <div className='col col--4'></div>
    </div>

  )
}

