var React = require('react');

var apiUser = require('./api/user');

class Login extends React.Component {
  login() {
    var token = prompt('Github Access Token:') || '';
    token = token.trim();
    if (token.length != 0) {
      apiUser.getGithubUser(token, (err, data) => {
        if (err) return alert(err.message);
        this.props.update(data);
      });
    }
  }
  render() {
    const style = {
      margin: '20%',
      float: 'right'
    };
    return <button style={style} className='btn btn--gray btn--stroke' onClick={this.login.bind(this)}>Login</button>
  }
}

class User extends React.Component {
  add() {
    var page = prompt('Url of where you found this');
    if (page === null || page === '') return;

    var parts = page.split('/');
    var site = parts[2];

    var src = '';
    var tags = [];
    
    if (site === 'www.instagram.com') {
      src = `https://www.instagram.com/p/${parts[4]}/media/?size=l`;
      tags.push('instagram');
    }

    src = prompt('Image Url:', src);
    if (src === null || src === '') return;

    var last = null;
    while (last !== '') {
      last = (prompt('Tag?') || '').trim();
      if (last != '') {
        tags.push(last.trim());
      }
    }

    this.props.add({
      src,
      page,
      tags
    })
  }
  render() {
    const style = {
      float: 'right'
    };
    return <div className='w48 m6' style={style}>
      <img className='w48 m0 round-bold' src={this.props.user.avatar} />
      <button className='btn btn--s btn--gray btn--stroke' onClick={this.add.bind(this)}>Add</button>
    </div>;
  }
}

module.exports = (props) => <div className='col--2'>
  {props.user ? <User user={props.user} add={props.add} /> : <Login update={props.update} />}
</div>;

