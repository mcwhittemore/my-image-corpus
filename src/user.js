var React = require('react');

var apiUser = require('./api/user');

class Login extends React.Component {
  login() {
    console.log(this.props);
    var token = prompt('Github Access Token:') || '';
    token = token.trim();
    if (token.length != 0) {
      apiUser.getGithubUser(token, (err, data) => {
        if (err) return alert(err.message);
        console.log('user data', data);
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
  render() {
    return <img src={this.props.user.avatar} />
  }
}

module.exports = (props) => <div className='col--2'>
  {props.user ? <User user={props.user} add={props.add} /> : <Login update={props.update} />}
</div>;

